import GroupCard from '../components/GroupCard';
import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  HStack,
  Spacer,
  Container,
  Heading,
  Center,
  Icon,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { BiShuffle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const unitID = 'FIT2099_CL_S1_ON-CAMPUS'; // TODO: should get from database or state management

function Groups() {
  // Retrieve route parameters
  const { groupStrategy, groupSize, variance, unitID } = useParams();

  const navigate = useNavigate();

  // Confirmation popup for shuffling groups
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleUploadClick = () => {
    navigate('/uploadStudents/' + unitID);
  };

  const [state, setState] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const summary = [];

    fetch('http://localhost:8080/api/groups/' + unitID)
      .then((res) =>
        res.json().then(function (res) {
          setState(res);

          for (let i = 0; i < res.length; i++) {
            summary.push({
              labId: res[i].labId,
              groupNumber: res[i].groupNumber,
              groupId: res[i].groupId,
            });
          }

          setAllGroups(summary);
        })
      )
      .catch((err) => setHasError(true));
  }, []);

  const handleShuffleGroups = () => {
    // Close confirmation dialog
    onClose();

    // API call to create groups from scratch - will automatically delete existing groups first
    fetch('http://localhost:8080/api/groups/' + unitID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupSize: groupSize,
        variance: variance,
        strategy: groupStrategy,
      }),
    })
      .then((res) =>
        res.json().then((res) => {
          console.log(res);
        })
      )
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Reload the page
        window.location.reload();
      });
  };

  return (
    <div>
      <Heading alignContent={"center"}>
        <Center margin="10">{unitID}</Center>
      </Heading>

      <HStack margin="0px 20vw 5vh 20vw">

        <Button onClick={handleUploadClick} colorScheme='gray' margin-left="20" size={"lg"}>
          Upload Students
        </Button>

        <Spacer />

        <HStack m="40px">
          <Spacer />
          <ButtonGroup colorScheme='#282c34' variant='outline' size={"lg"}>
            <Button margin="0px 2px" isDisabled={true}>Groups</Button>
            <Link to={'/students/' + unitID}>
              <Button margin="0px 2px">Students</Button>
            </Link>
          </ButtonGroup>
          <Spacer />
        </HStack>

        <Spacer />

        <Button colorScheme='gray' onClick={onOpen} size={"lg"}>
          Shuffle Groups<Icon margin="0px 0px 0px 10px" as={BiShuffle}></Icon>
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Shuffle Groups
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This will delete all existing groups.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='green' onClick={handleShuffleGroups} ml={3}>
                  Shuffle
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      </HStack>

      <Container className="groups" maxW="80vw">
        {state.map((group) => (
          <GroupCard props={group} key={group.id} allIds={allGroups} />
        ))}
      </Container>
    </div>
  );
}

export default Groups;
