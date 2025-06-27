import React, { useEffect, useState } from "react";
import { Flex, Box, Button, Input } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import PostFeed from "../components/posts/PostFeed.jsx";
import PostItem from "../components/posts/PostItem.jsx";
import { getAllPosts } from "../services/postsService.js";
import { uploadProfileImage } from "../services/usersService.js";
import {getUserData} from "../utils/utils.js";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response?.data?.content || []);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await uploadProfileImage(1, formData); // test userId = 1
      alert("Upload successful");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
      <>
        <Navbar />
        <Flex
            justify="center"
            align="start"
            bg="url(./src/assets/alg_wd_blur.svg)"
            bgRepeat="no-repeat"
            bgSize="cover"
            backgroundPosition="center"
            minH="100vh"
            pt={6}
            px={4}
        >
          <Flex
              direction={{ base: "column", md: "row" }}
              width="100%"
              maxW="1600px"
              gap={6}
          >
            <Box width={{ base: "100%", md: "22%" }} mb={{ base: 6, md: 0 }}>
              <Sidebar />
            </Box>

            <Box
                flex="1"
                bg="white"
                borderRadius="lg"
                boxShadow="lg"
                border="1px solid rgba(255,255,255,0.2)"
                minH="80vh"
                overflowY="auto"
                className="feed-scroll"
                p={6}
            >
              <Box mb={4}>
                <Input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <Button onClick={handleUpload} mt={2}>
                  Upload Profile Image
                </Button>
              </Box>

              <PostFeed />
              <Box
                  mt={6}
                  maxH="calc(100vh - 200px)"
                  overflowY="auto"
                  pr={2}
                  className="feed-scroll"
              >
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </>
  );
}

export default HomePage;
