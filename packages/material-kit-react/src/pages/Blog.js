import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import axios from "axios";

// material
import { Grid, Button, Container, Stack, Typography } from "@mui/material";

// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../sections/@dashboard/blog";

// mock
// import POSTS from "../_mock/blog";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles/pages/1").then((data) => {
      let articles = data?.data?.result?.articles;
      articles = articles.map((article) => {
        return {
          cover:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkm9k9MSevdeLrAlNqMcUFTTriliaXi91E0Q&usqp=CAU",
          title: article.title,
          view: article.viewers,
          comment: article.comments,
          share: 10,
          author: article.author,
          createdAt: article.createdAt,
        };
      });
      setPosts(articles);
    });
  }, []);

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch posts={posts} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => {
            return <BlogPostCard key={post.id} post={post} index={index} />;
          })}
        </Grid>
      </Container>
    </Page>
  );
}
