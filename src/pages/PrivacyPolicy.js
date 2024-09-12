import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { WebsiteInfo } from "../components/TextFile";
const PrivacyPolicy = () => {
    return (
        <Box maxWidth="800px" mx="auto" my={8} color='white'>
            <Heading as="h1" mb={4}>
                {WebsiteInfo.name} Privacy Policy
            </Heading>
            <Text mb={4}>
                Effective date: January 4th, 2024
            </Text>
            <Text>
                At {WebsiteInfo.name}, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share information about you when you use our website [insert website URL]. By using our website, you consent to our collection and use of your information as described in this Privacy Policy.
            </Text>
            <Text mt={8} fontWeight="bold">
                What Information We Collect
            </Text>
            <Text mb={4}>
                We collect the following information from you when you use our website:
            </Text>
            <ul style={{ marginLeft:'1rem'}}>
                <li>Your name (for display purposes)</li>
                <li>Birthdate (for marketing purposes)</li>
                <li>Email address (for registration purposes)</li>
                <li>Crypto deposit wallet address (to facilitate transactions)</li>
                <li>Social media links (optional, to allow users to communicate)</li>
                <li>Profile picture (optional, for display purposes)</li>
            </ul>
            <Text mb={4}>
                We require the mandatory information listed above to provide our services to you.
            </Text>
            <Text mt={8} fontWeight="bold">
                How We Use Your Information
            </Text>
            <Text mb={4}>
                We use the information we collect from you for the following purposes:
            </Text>
            <ul style={{ marginLeft:'1rem'}}>
                <li>To provide and operate our services</li>
                <li>To communicate with you</li>
                <li>To personalize your experience</li>
                <li>To improve our website and services</li>
                <li>To comply with any applicable laws and regulations</li>
            </ul>
            <Text mb={4}>
                We may also use your information for marketing purposes, such as to send you promotional emails or newsletters. You can opt-out of receiving these communications at any time by following the instructions provided in the communication.
            </Text>
            <Text mt={8} fontWeight="bold">
                Sharing Your Information
            </Text>
            <Text mb={4}>
                We do not sell your personal information to third parties. However, we may share your information with third-party service providers who perform services on our behalf, such as payment processing or email delivery. These service providers are only authorized to use your information as necessary to perform services for us and are obligated to keep your information confidential.
            </Text>
            <Text mb={4}>
                We may also share your information if required by law, such as in response to a subpoena or other legal process, or if we believe it is necessary to protect our rights or the rights of others, investigate fraud, or respond to a government request.
            </Text>
            <Text mt={8} fontWeight="bold">
                Security of Your Information
            </Text>
            <Text mb={4}>
                We take appropriate measures to protect the security of your information, both during transmission and after we receive it. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee its absolute security.
            </Text>
            <Text mt={8} fontWeight="bold">
                Your Rights
            </Text>
            <Text mb={4}>
                You have the right to access and control your personal information. You can do this by logging into your account and updating your profile. You can also request that we delete your personal information, although we may need to retain certain information for record-keeping purposes or to comply with our legal obligations.
            </Text>
            <Text mt={8} fontWeight="bold">
                Changes to This Privacy Policy
            </Text>
            <Text mb={4}>
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated policy on our website or by other means as required by law.
            </Text>
            <Text mt={8} fontWeight="bold">
                Contact Us
            </Text>
            <Text mb={4}>
                If you have any questions or concerns about this Privacy Policy, please contact us at {WebsiteInfo.email}.
            </Text>
        </Box>
    );
}

export default PrivacyPolicy;
