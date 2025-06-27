import {
  Avatar,
  Input,
  Stack,
  Text,
  Box,
  VStack,
  Textarea,
  Button,
  Flex,
  FileUpload,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getFullName } from "../../utils/utils";
import { createPost, uploadPostImage } from "../../services/postsService";
import { LuUpload } from "react-icons/lu";

function PostFeed({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fullName = getFullName();

  {
    /* 
  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await uploadPostImage(//getUserID, formData);
      alert("Upload successful");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };*/
  }

  const handlePost = async () => {
    if (!title.trim() && !content.trim()) return;

    const postData = {
      title,
      content,
      imageId: " ",
    };

    try {
      const response = await createPost(postData);

      if (response?.data) {
        //console.log('Post created:', response.data);
        setTitle("");
        setContent("");
        if (typeof onPostCreated === "function") onPostCreated();
      } else {
        console.log("No response from posting.");
      }
    } catch (e) {
      console.log("Post error:", e);
    }
  };

  return (
    <Box
      display="flex"
      align="center"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction="row"
        h="auto"
        w="100%"
        borderBottom={"1px solid var(--feed-div)"}
      >
        <Box
          display="flex"
          align="center"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar.Root size={"2xl"} pos={"relative"}>
            <Avatar.Fallback name={fullName} />
            <Avatar.Image src="https://avatars.githubusercontent.com/u/210037477?v=4" />
          </Avatar.Root>
        </Box>

        <VStack spacing={4} w="100%">
          <Box p={4} w="100%">
            <Input
              value={title}
              placeholder="Feed title"
              flex="1"
              marginBottom={"2"}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="What's on your mind..."
              minHeight="100px"
              height="100px"
              maxHeight="200px"
              w="100%"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Box>
              <FileUpload.Root
                alignItems="stretch"
                maxFiles={1}
                onFileAccept={(e) => setSelectedFile(e.target.files[0])}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                    <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            </Box>
            <Flex w="100%" justify="flex-end" marginTop={5}>
              <Button
                variant="outline"
                style={{
                  background:
                    "linear-gradient(45deg, var(--alg-gradient-color-1), var(--alg-gradient-color-2))",
                  color: "white",
                }}
                onClick={handlePost}
              >
                Post
              </Button>
            </Flex>
          </Box>
        </VStack>
      </Stack>
    </Box>
  );
}

export default PostFeed;
