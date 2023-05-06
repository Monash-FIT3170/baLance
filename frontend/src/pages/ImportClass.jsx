import React, { useState } from "react";
import logo from "../assets/logo.png";
import { 
  Box,
  Text,
  Flex,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  extendTheme,
  AlertDescription,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  CloseButton,
  Select,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure

} from "@chakra-ui/react";
import {
  AddIcon,
  CloseIcon,
  EditIcon
} from "@chakra-ui/icons";
import NavBar from "../components/NavBar";

const customTheme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
})

function ImportPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddProfileForm, setShowAddProfileForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const handleFile = (file) => {
    if (!file.type.match("csv.*")) {
      setErrorMessage("Please select a CSV file");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const csvString = event.target.result;
      setCsvFile(file);
      setErrorMessage("");
      console.log(csvString);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  /* Dummy data for the table
  const profiles = [
    {
      firstName: "John",
      lastName: "Doe",
      emailAddress: "john.doe@example.com",
      wam: "HD",
      status: "Active",
      role: "Teacher"
    },
    {
      firstName: "Jane",
      lastName: "Duncan",
      emailAddress: "jane.duncan@example.com",
      wam: "D",
      status: "Active",
      role: "Student"
    },
    {
      firstName: "Tom",
      lastName: "Marshall",
      emailAddress: "tom.marshall@example.com",
      wam: "D",
      status: "Active",
      role: "Student"
    },
    {
      firstName: "Jessica",
      lastName: "Stoltman",
      emailAddress: "jessica.stoltman@example.com",
      wam: "P",
      status: "Active",
      role: "Student"
    },
  ];
  */
  const [profiles, setProfiles] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [wam, setWam] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = { firstName, lastName, emailAddress: email, wam, status, role };
    setProfiles([...profiles, newProfile]);
    setShowAddProfileForm(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setWam("");
    setStatus("");
    setRole("");
  };
  
  const [profileToEdit, setProfileToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  const handleSaveProfile = (updatedProfile) => {
    console.log(updatedProfile);
  
    if (!profileToEdit) {
      // handle error - profileToEdit is not defined
      return;
    }
  
    // Find the index of the profile in the profiles array
    const index = profiles.findIndex(profile => profile.emailAddress === profileToEdit.emailAddress);
    
    // Update the profile object with the new values
    const updatedProfiles = [...profiles];
    updatedProfiles[index] = {...updatedProfile};
  
    // Update the profiles state with the updated profile object
    setProfiles(updatedProfiles);
    
    // Close the edit modal
    onClose();
  };
  
  
  

  return (
    <>
      <NavBar />
      <Box as="header" p="4" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Upload Profiles
        </Text>
      </Box>
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        margin="20px"
      >
        <Box
          width="50%"
          height="175px"
          border="2px dashed black"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text
            fontFamily="Montserrat, sans-serif"
            fontWeight="bold"
            fontSize="2xl"
            mb={4}
          >
            Drag and Drop CSV file here
          </Text>
          <Box
            bg="white"
            borderRadius="md"
            width="80%"
            p={4}
            mb={4}
            fontWeight="bold"
          >
            {csvFile ? (
              <Text>No file chosen: {csvFile.name}</Text>
            ) : (
              <>
                <Text mb={2}>No file chosen</Text>
                <Button variant="solid" colorScheme="blue">
                  Choose File
                  <input
                    type="file"
                    onChange={handleUpload}
                    style={{ display: "none" }}
                  />
                </Button>
              </>
            )}
          </Box>
          {errorMessage && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Box>
            </Alert>
          )}
        </Box>
        <Box
          width="80%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={8}
        >
        <Box borderWidth="2px" borderColor="black" as="header" p="4">
        <Text fontSize="2xl" fontWeight="bold">
          View Profiles
        </Text>
        </Box>
          <TableContainer borderWidth="2px" borderColor="black">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email Address</Th>
                  <Th>WAM</Th>
                  <Th>Status</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {profiles.map((profile, index) => (
                  <Tr key={index}>
                    <Td>{profile.firstName}</Td>
                    <Td>{profile.lastName}</Td>
                    <Td>{profile.emailAddress}</Td>
                    <Td>{profile.wam}</Td>
                    <Td>{profile.status}</Td>
                    <Td>{profile.role}</Td>
                    <Td>
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setProfileToEdit(profile);
                          onOpen();
                        }}
                      />
                  </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalBody>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      value={profileToEdit?.firstName}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      value={profileToEdit?.lastName}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      value={profileToEdit?.emailAddress}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          emailAddress: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>WAM</FormLabel>
                    <Select
                      placeholder="Select WAM"
                      value={profileToEdit?.wam}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          wam: e.target.value,
                        })
                      }
                    >
                      <option value="HD">HD</option>
                      <option value="D">D</option>
                      <option value="P">P</option>
                      <option value="N">N</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select
                      placeholder="Select Status"
                      value={profileToEdit?.status}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Select Role"
                      value={profileToEdit?.role}
                      onChange={(e) =>
                        setProfileToEdit({
                          ...profileToEdit,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="Teacher">Teacher</option>
                      <option value="Student">Student</option>
                    </Select>
                  </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => handleSaveProfile(profileToEdit)} type="submit" colorScheme="green" mr={3}>
                      Save
                    </Button>
                    <Button onClick={() => { setIsEditing(false); onClose();}}>Cancel</Button>
                  </ModalFooter>
              </ModalContent>
            </Modal>

            <Box textAlign="center">
              <Button
                mt={4}
                mb={4}
                colorScheme="green"
                leftIcon={<AddIcon />}
                onClick={() => setShowAddProfileForm(true)}
              >
                Add Profile
              </Button>
            </Box>
          </TableContainer>
        </Box>
        <Box mt={8} display="flex" justifyContent="space-between" alignItems="center">
              <Select placeholder="Select strategy" w="40%" mr={4}>
                <option value="random">Random</option>
              </Select>
              <Select placeholder="No. per team" w="40%" mr={4}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
              <Button colorScheme="blue">Assign groups</Button>
          </Box>
      </Flex>
      {showAddProfileForm && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex="modal"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
            width={{ base: "90vw", sm: "50vw", md: "30vw" }}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                Add Profile
              </Text>
              <CloseButton
                aria-label="Close"
                onClick={() => setShowAddProfileForm(false)}
              />
            </Flex>
            <Divider my={4} />
            <Box as="form" onSubmit={handleSubmit} onCancel={() => setShowAddProfileForm(false)}>
              <FormControl mb={4}>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>WAM</FormLabel>
                <Select placeholder="Select WAM" value={wam} onChange={e => setWam(e.target.value)}>
                  <option value="HD">HD</option>
                  <option value="D">D</option>
                  <option value="P">P</option>
                  <option value="N">N</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Status</FormLabel>
                <Select placeholder="Select Status" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select Role" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Student">Student</option>
                <option value="Inactive">Teacher</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="blue" mr={3}>Save</Button>
              <Button onClick={() => setShowAddProfileForm(false)}>Cancel</Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
  

}

export default ImportPage;
