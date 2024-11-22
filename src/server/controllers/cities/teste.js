const express = require("express");

const createServer = (pool, port = 3000) => {
  const app = express();

  const buildCommentTree = (comments) => {
    const map = {};
    const tree = [];

    comments.forEach((comment) => {
      comment.children = [];
      map[comment.id] = comment;
    });

    comments.forEach((comment) => {
      if (comment.parent_id) {
        map[comment.parent_id]?.children.push(comment);
      } else {
        tree.push(comment);
      }
    });

    const cleanTree = (nodes) =>
      nodes.map(({ id, text, children }) => ({
        id,
        text,
        ...(children.length > 0 && { children: cleanTree(children) }),
      }));

    return cleanTree(tree);
  };

  app.get("/posts/:postId/comments", async (req, res) => {
    const { postId } = req.params;

    try {
      const postExists = await pool.query(
        "SELECT id FROM posts WHERE id = $1",
        [postId]
      );

      if (postExists.rowCount === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      const { rows: comments } = await pool.query(
        "SELECT id, text, parent_id FROM comments WHERE post_id = $1",
        [postId]
      );
      const commentTree = buildCommentTree(comments);

      return res.status(200).json({ data: commentTree });
    } catch (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return {
    app,
    close: () =>
      new Promise((resolve) => {
        server.close(() => {
          console.log("Server closed");
          resolve();
        });
      }),
  };
};

module.exports = { createServer };
