import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import DatabaseService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
	const [post, SetPost] = useState([]);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			DatabaseService.getPost(slug).then((post) => {
				if (post) {
					SetPost(post);
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return post ? (
		<div className="py-8">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
}

export default EditPost;
