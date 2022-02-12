const db = require("../models");
const Post = db.post;

// gell all post data
exports.findAll = (req, res) => {
	Post.find()
		.then((posts) => {
			res.send(posts);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving posts.",
			});
		});
};

exports.store = (req, res) => {
	const post = new Post({
		title: req.body.title,
		body: req.body.body,
		published: req.body.published ?? false,
	});

	post.save(post)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the post.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Post.findById(id)
		.then((post) => {
			if (!post) {
				return res.status(404).send({
					message: "Post not found with id " + id,
				});
			}
			res.send(post);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while finding the post.",
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	Post.findByIdAndUpdate(id, req.body)
		.then((post) => {
			if (!post) {
				return res.status(404).send({
					message: "Post not found with id " + id,
				});
			}
			res.send({
				message: "Post updated successfully",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while updating the post.",
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Post.findByIdAndRemove(id)
		.then((post) => {
			if (!post) {
				return res.status(404).send({
					message: "Post not found with id " + id,
				});
			}
			res.send({
				message: "Post deleted successfully",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while deleting the post.",
			});
		});
};
