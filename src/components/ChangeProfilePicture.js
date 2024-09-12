import React, { useState, useRef } from 'react'
import { Text, Divider, Box, Flex, Image, Button, Center } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ProfilePicture1 from '../assets/1.png';
import ProfilePicture2 from '../assets/2.png';
import ProfilePicture3 from '../assets/3.png';
import ProfilePicture4 from '../assets/4.png';
import ProfilePicture5 from '../assets/5.png';
import ProfilePicture6 from '../assets/6.png';
import ProfilePicture7 from '../assets/7.png';
import ProfilePicture8 from '../assets/8.png';
import ProfilePicture9 from '../assets/9.png';
import ProfilePicture10 from '../assets/10.png';
import ProfilePicture11 from '../assets/11.png';
import ProfilePicture12 from '../assets/12.png';
import ProfilePicture13 from '../assets/13.png';
import ProfilePicture14 from '../assets/14.png';
import ProfilePicture15 from '../assets/15.png';
import ProfilePicture16 from '../assets/16.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeProfilePicture = () => {
    const { auth } = useAuth();
    const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
    // const [loading, setLoading] = useState(false);
    // const [file, setFile] = useState('');
    const [image, setImage] = useState(auth.user.picturePath ? auth.user.picturePath : profilePictures[(auth.user.randomizedProfilePicture - 1)]);
    const axiosPrivate = useAxiosPrivate();

    // const fileInputRef = useRef(null);

    // function previewFiles(file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         console.log(image);
    //         setImage(reader.result)
    //     }
    // }
    // const handleChange = (e) => {
    //     // console.log(e.target.files);
    //     // console.log(e.target.files[0]);
    //     const file = e.target.files[0];
    //     if (file) {
    //         // Check file size
    //         const fileSizeMB = file.size / (1024 * 1024); // Convert to MB
    //         const maxSizeMB = 3; // Maximum allowed file size in MB
    //         if (fileSizeMB > maxSizeMB) {
    //             alert('The selected image size exceeds the maximum allowed limit of 3 MB.');
    //             return;
    //         }

    //         setFile(file);
    //         previewFiles(file);
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        const userId = auth.user.userId;
        // console.log(image);
        if (!image.startsWith('/static/media/')) {
          // User chose an image from their device, proceed with uploading to Cloudinary
          try {
            await axiosPrivate.post(`/users/uploadtocloudinary`, { image: image })
              .then((res) => {
                const cloudinaryLink = res.data;
                try{
                    axiosPrivate.post('/users/updateuser', {userId, picturePath: cloudinaryLink})
                    .then((response) => {
                      if(response.data.success){
                        toast.success("Uploded picture successfully!");
                        window.location.reload();
                      }else{
                        toast.error("Upload picture failed!");
                      }
                    })
                    .catch(console.log)
                  }catch(error){
                    console.log(error);
                    toast.error(error);
                  }
              })
              // .then(() => setLoading(false))
              .catch(console.log);
          } catch (error) {
            console.error("Error checking ticket:", error);
          }
        } else {
            const startIndex = image.lastIndexOf('/') + 1;
            let imageNumberString = image.substring(startIndex, startIndex+2);
            if(imageNumberString.includes('.')){
                imageNumberString.replace('.', '');
            }
            const imageNumber = parseInt(imageNumberString, 10);
            try{
                axiosPrivate.post('/users/updateuser', {userId, randomizedProfilePicture: imageNumber})
                .then((response) => {
                  if(response.data.success){
                    toast.success("Uploded picture successfully!");
                    window.location.reload();
                  }else{
                    toast.error("Upload picture failed!");
                  }
                })
                .catch(console.log)
              }catch(error){
                console.log(error);
                toast.error(error);
              }
        }
      };
    // const handleButtonClick = () => {
    //     fileInputRef.current.click();
    // };

    return (
        <div>
            <Text fontSize={['20px', '35px']} as='b' color='white' mb='3'>
                Change Profile Picture
            </Text>
            <Divider />
            <Box>
                <Center>
                    <Image
                        src={image}
                        alt='User Profile'
                        w={['180px', '300px']}
                        h={['180px', '300px']}
                        borderRadius='10%'
                        border='#beef00 solid 3px'
                        mt='2rem'
                        objectFit="cover" // Crop the image to fit the container
                        objectPosition="center" // Center the cropped image
                    />
                </Center>
                {/* <Center>
                    <div>
                        <Button
                            w={['180px', '300px']}
                            color='black'
                            mt='4'
                            onClick={handleButtonClick}
                        >
                            Choose Photo
                        </Button>
                        <input
                            type='file'
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleChange}
                            accept='image/png, image/jpeg, image/jpg, image/jfif'
                        />
                    </div>
                    
                </Center> */}
                <Center>
                <Button
                        w={['180px', '300px']}
                        bg='#beef00'
                        color='black'
                        my='4'
                        onClick={e => handleSubmit(e)}
                    // onClick={()=>setIsModalOpen(true)}
                    >Save Photo</Button>
                </Center>
            </Box>
            <Divider />
            <Box m='1rem'>
            <Center>
        <Box>
          <Text as='b' fontSize='lg' mb='2rem' color='white'>You can also choose from here</Text>
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Box>
  {profilePictures.map((picture, index) => (
    (index % 4 === 0) ? (
      // Create a new row for every fourth image
      <Flex key={index} justify="center">
        {profilePictures.slice(index, index + 4).map((profilePicture, subIndex) => {
          const imageIndex = index + subIndex + 1; // Calculate the correct image index
          return (
            <Image
              key={subIndex}
              src={profilePicture}
              alt={`Profile Picture ${imageIndex}`}
              w={['60px', '100px']}
              h={['60px', '100px']}
              borderRadius='10%'
              border='#beef00 solid 3px'
              mx="1rem"
              my="1rem"
              onClick={() => setImage(profilePictures[imageIndex-1])}
            />
          );
        })}
      </Flex>
    ) : null
  ))}
</Box>
            </Box>
            <ToastContainer />
        </div>
    )
}

export default ChangeProfilePicture;