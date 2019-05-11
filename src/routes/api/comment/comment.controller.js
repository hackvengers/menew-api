const Comment = require('../../../models/comment');

exports.writeComment = (req, res) => {
  const { content } = req.body;

  const respond = comment => {
    res.json({
      result: true,
      message: comment
    });
  };

  Comment.create({ content }).then(respond);
};

exports.listComment = (req, res) => {
  const respond = comments => {
    res.json({
      result: true,
      message: comments
    });
  };
  Comment.find().then(respond);
};
