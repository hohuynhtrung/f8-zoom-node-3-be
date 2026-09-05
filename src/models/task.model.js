const db = require("@/config/database");

const taskModel = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
  },

  async findOne(id) {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async create(taskData) {
    const { title, content = "", is_completed = 0 } = taskData;
    const [result] = await db.query(
      "INSERT INTO tasks (title, content, is_completed) VALUES (?, ?, ?)",
      [title, content, is_completed],
    );
    return this.findOne(result.insertId);
  },

  async update(id, taskData) {
    const { title, content, is_completed } = taskData;
    const [result] = await db.query(
      "UPDATE tasks SET title = ?, content = ?, is_completed = ? WHERE id = ?",
      [title, content, is_completed, id],
    );
    return result.affectedRows;
  },

  async destroy(id) {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async toggleCompleted(id, is_completed) {
    const [result] = await db.query(
      "UPDATE tasks SET is_completed = ? WHERE id = ?",
      [is_completed ? 1 : 0, id],
    );
    return result.affectedRows;
  },
};

module.exports = taskModel;
