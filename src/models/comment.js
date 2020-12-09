const connection = require("./../database/connect");
const util = require("util");

const query = util.promisify(connection.query).bind(connection);

class Comment {
  async commentSong(username, music_id, content, created_at) {
    const queryString = `INSERT INTO comment (content, uuid, music_id, created_at)
            VALUES (?, (SELECT u.uuid FROM user u
            WHERE u.username = ?), ?, ?);`;
    try {
      const result = await query(queryString, [content, username, music_id, created_at]);
      return result.affectedRows;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

module.exports = Comment;
