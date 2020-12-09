const Comment = require('./../models/comment');
const jwt = require('jsonwebtoken');

const commentSongController = (access_token, content, music_id, created_at) => {
    const comment = new Comment();
    comment.commentSong(jwt.decode(access_token).name, music_id, content, created_at)
}

module.exports = commentSongController;
