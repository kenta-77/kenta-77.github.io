import styled from './input.module.scss';
import React, { useState, useRef } from 'react';
import axios from "axios";
import Select, { MultiValue } from 'react-select';
import Image from 'next/image';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Box, Text, Flex, Center, Heading, Divider, HStack, VStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Slider, SliderMark, SliderThumb, Tooltip, SliderTrack, SliderFilledTrack, ChakraProvider, Spinner, Link} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import theme from "./theme";
import { FaFacebook} from 'react-icons/fa';

export default function MainPage() {
  // useState()で画像のパスを保持
  // ※デフォルトで表示する画像を初期値で指定(この例ではpublicフォルダのdefault-profile.pngを指定)
	type ParameterObject = {
		mosaic_type: string;
		strength: string;
	}
	interface OptionAdapt {
		value: string;
		label: string;
	}
  const [photo, setPhoto] =useState<string>('/face_image1.jpeg');
  const [result_photo, setResultPhoto] =useState<string>('/face_image1.jpeg');
	const myLoader = ({ src, width, quality }) => {
		return `${src}`
	}
	const [parameter, setParameter] = useState<ParameterObject>({mosaic_type: '0', strength: '1'});
	const [adapt, setAdapt] = useState<OptionAdapt[]>([{value: '1', label: '1'},{value: '2', label: '2'}]);
	const [person, setPerson] = useState<string>(',');
  const [showTooltip, setShowTooltip] = React.useState(false);
	const [loading, setLoading] = useState<boolean>();
	const [loading2, setLoading2] = useState<boolean>();

	const option_type = [
		{value: '1', label: 'mosaic'},
		{value: '2', label: 'stamp'}
	];

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
			setPhoto('/face_image1.jpeg');
			return;
		}
		setLoading(true);
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
		const formData = new FormData();
		formData.append('image', fileObject);
		formData.append('strength', "1");
		await axios.post(
			'http://127.0.0.1:8000/mosaics/rectangle/',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		const res = await fetch("http://127.0.0.1:8000/mosaics/");
		const users = await res.json();
		const photosrc = "http://127.0.0.1:8000" + users["rectangle"];
		const active_user = users["active_number"];
		for(let i = 0; i < Number(active_user); i++){
			if(i == 0){
				setAdapt((adapt => [{value: `${i}`, label: `${i+1}`}]));
			}
			else{
				setAdapt((adapt => [...adapt,{value: `${i}`, label: `${i+1}`}]));
			}
		}
    // オブジェクトURLを生成し、profileImageを更新
    setPhoto(photosrc); 
		setLoading(false);
  }

  const onClickChangePhoto = async() => {
		setLoading2(true);
    const formData = new FormData();
		//クリックと同時に画像をバックエンドに送信
		let input_image = document.getElementById("image") as HTMLInputElement;
		if (input_image instanceof HTMLInputElement && input_image.files) {
			formData.append('image',input_image.files[0]);
		}
		formData.append('mosaic_type', String(parameter.mosaic_type));
		formData.append('strength', String(parameter.strength));
		console.log(person);
		formData.append('rect_number', person);
    await axios.post(
			'http://127.0.0.1:8000/mosaics/',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
			onClickApi();
			setLoading2(false);
  }
	const onClickApi = async() => {
		try {
		let res = await fetch("http://127.0.0.1:8000/mosaics/");
		let users = await res.json();
		let photosrc = "http://127.0.0.1:8000" + users["result"];
		// let image_src = document.getElementById("image01");
		setResultPhoto(photosrc);
	} catch (err) { console.log('error'); }
	};

	const onChangeType = (value: string) => {
    const param_type: string = value;
		setParameter({...parameter, mosaic_type: String(value)});
  }

	
	const onChangeStrength = (value: string) => {
		const param_strength: string = value;
		setParameter({...parameter, strength: String(value)});
  }

	const onChangeNumber = (e: MultiValue<OptionAdapt>) => {
		let adapt_text: string = "";
		e.map((selection)=>{
			adapt_text = selection.value + "," + adapt_text;
			setPerson(`${adapt_text}`);
		});
	}
	const inputRef = useRef(null);
	const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

	const onClickDownload = async(): Promise<File> => {
		let res = await fetch("http://127.0.0.1:8000/mosaics/");
		let users = await res.json();
		let photosrc = "http://127.0.0.1:8000" + users["result"];
		const blob = await (await fetch(photosrc)).blob();
		const objectURL = URL.createObjectURL(blob); 
		const a = document.createElement("a");
		document.body.appendChild(a);
		a.download = 'sample.jpg';
		a.href = objectURL;
		a.click();
		a.remove();
		URL.revokeObjectURL(objectURL);
		return ;
	}
	const config = {
    via: 'kara_d',
    size: 32
}

interface SocialProps {
    url: string
    title: string
    size?: number
    via?: string
}
	
  return (
	<>
	<ChakraProvider theme={theme}>
		<Flex minWidth='max-content' alignItems='center' gap='2' bg="teal.400" opacity="0.9" color="#ffff" h="50px">
			<Box pl='35px' as="a" href='http://localhost:3000/' _hover={{ color: "gray.100"}}>
				<Heading fontSize={38} fontWeight="bold">FaMo</Heading>
			</Box>
			<Spacer />
			<Box mr='25px' position="relative" w='38px' h="38px" >
				<Link href='https://github.com/kenta-77/Mosaic_app'>
					<Image src='/github-mark.png' alt="" fill style={{ objectFit: 'contain'}}/>
				</Link>
			</Box>
		</Flex>
		<Flex>
				<Box bg="white" mt="10px" ml="3%" mr="3%" width="44%" height="690px" rounded="md" borderColor="blackAlpha.50">
					<Box w="200px">
						<VStack>
							<Text color="blackAlpha.600" fontSize="30px">アップロード</Text>
							<Divider w="80px" borderColor="gray" opacity="1"/>
						</VStack>
					</Box>
						<Box width="150px" height="40px" m="8px">
							<Button onClick={fileUpload}><FontAwesomeIcon icon={faPlus}/>アップロード</Button>
							<input hidden ref={inputRef} type="file" name="image" id="image" accept="image/*" onChange={onFileInputChange}/>
						</Box>
					<Box width="100%" position="relative" height="300px">
							{loading && (
								<Center h="100%">
									<Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl"/>
								</Center>
							)}
							{!loading && (
							<Image loader={myLoader} src={photo} alt="input picture" fill style={{ objectFit: 'contain'}}/>
							)}
					</Box>
					<Box width="100%" height="300px" rounded="md">
						<Center>
							<Divider w="80%" borderColor="gray" opacity="1" p="1"/>
						</Center>
						<Tabs variant='soft-rounded' colorScheme='green' onChange={(e) => onChangeType(String(e))}>
							<Center pt="2">
								<TabList>
									<Tab fontSize="13px">モザイク</Tab>
									<Tab fontSize="13px">ぼかし</Tab>
									<Tab fontSize="13px">スタンプ</Tab>
								</TabList>
							</Center>
							<TabPanels>
								<TabPanel>
									<VStack spacing="3%" align='stretch' w="100%">
										<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%">強さ</Text>
										<Center>
										<HStack spacing={2} w="80%">
											<Slider id='slider' step={1} defaultValue={50} min={1} max={100} colorScheme='teal' onChange={(e) => onChangeStrength(String(e))} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
												<SliderMark value={5} mt='1' ml='-2.5' fontSize="11px">低</SliderMark>
												<SliderMark value={50} mt='1' ml='-2.5' fontSize="11px">中</SliderMark>
												<SliderMark value={95} mt='1' ml='-2.5' fontSize="11px">高</SliderMark>
												<SliderTrack>
													<SliderFilledTrack />
												</SliderTrack>
												<Tooltip hasArrow bg='teal.400' color='white' placement='top' isOpen={showTooltip}>
													<SliderThumb />
												</Tooltip>
											</Slider>
										</HStack>
										</Center>
											<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%" pt="2">加工しない人</Text>
											<Center>
												<Box w="80%">
													<Select id="selectbox" instanceId="selectbox" onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
												</Box>
											</Center>
										<Center w="25%" pl="10%">
											<Button colorScheme='teal' variant='solid' onClick={onClickChangePhoto}>加工する</Button>
										</Center>
								</VStack>
								</TabPanel>
								<TabPanel>
								<VStack spacing="3%" align='stretch' w="100%">
								<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%">強さ</Text>
									<Center>
										<HStack spacing={2} w="80%">
											<Slider id='slider' step={1} defaultValue={50} min={1} max={100} colorScheme='teal' onChange={(e) => onChangeStrength(String(e))} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
												<SliderMark value={5} mt='1' ml='-2.5' fontSize="11px">低</SliderMark>
												<SliderMark value={50} mt='1' ml='-2.5' fontSize="11px">中</SliderMark>
												<SliderMark value={95} mt='1' ml='-2.5' fontSize="11px">高</SliderMark>
												<SliderTrack>
													<SliderFilledTrack />
												</SliderTrack>
												<Tooltip hasArrow bg='teal.400' color='white' placement='top' isOpen={showTooltip}>
													<SliderThumb />
												</Tooltip>
											</Slider>
										</HStack>
										</Center>
									<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%" pt="2">加工しない人</Text>
									<Center>
										<Box w="80%">
											<Select id="selectbox" instanceId="selectbox" onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
										</Box>
									</Center>
									<Center w="25%" pl="10%">
										<Button colorScheme='teal' variant='solid' onClick={onClickChangePhoto}>加工する</Button>
									</Center>
									</VStack>
									</TabPanel>
									<TabPanel>
										<VStack spacing="3%" align='stretch' w="100%">
										<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%" pt="2">加工しない人</Text>
										<Center>
											<Box w="80%">
												<Select id="selectbox" instanceId="selectbox" onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
											</Box>
										</Center>
										<Center w="25%" pl="10%">
											<Button colorScheme='teal' variant='solid' onClick={onClickChangePhoto}>加工する</Button>
										</Center>
										</VStack>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Box>
			<Box bg="white" mt="10px" ml="3%" mr="3%" width="44%" height="690px" rounded="md" borderColor="blackAlpha.50">
				<Box w="200px">
						<VStack>
							<Text color="blackAlpha.600" fontSize="30px">ダウンロード</Text>
							<Divider w="80px" borderColor="gray" opacity="1"/>
						</VStack>
				</Box>
				<Box width="100%" position="relative" height="300px" mt="56px" rounded="md">
					<Center h="100%">
						{loading2 && (
								<Center>
									<Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl"/>
								</Center>
							)}:{!loading2 && (
								<Image loader={myLoader} src={result_photo} alt="input picture" fill style={{ objectFit: 'contain'}}/>
							)}
					</Center>
				</Box>
				<Center>
					<Divider w="80%" borderColor="gray" opacity="1" p="1"/>
				</Center>
				<Center>
					<Box width="80%" height="100px" rounded="md">
							<Box w="50%" mt="10px">
									<Button colorScheme='teal' variant='solid' onClick={onClickDownload}>ダウンロード</Button>
							</Box>
					</Box>
				</Center>
				<Box>
						<VStack>
							<Text color="blackAlpha.600" fontSize="30px">SHARE</Text>
							<Divider w="80px" borderColor="gray" opacity="1"/>
							<Box pt='10px'>
								<Flex>
									<Box position="relative" w='50px' h="50px" mr='10px' ml='10px' color='black'> {/* twitter32px以上 */}
										<Link href='https://twitter.com/compose/tweet'>
											<Center h='100%' w='100%'>
												<Image src='/Twitter.png' alt="" fill style={{ objectFit: 'contain'}}/>
											</Center>
										</Link>
									</Box>
									<Box position="relative" w='50px' h="50px" mr='10px' ml='10px'>
										<Link href='https://www.facebook.com/'>
											<Center h='100%' w='100%'>
												<FaFacebook color='#1877F2' size='50px' />
											</Center>
										</Link>
									</Box>
									<Box position="relative" w='50px' h="50px" mr='10px' ml='10px'> {/* instagram29px以上 */}
										<Link href='https://www.instagram.com/'>
											<Center h='100%' w='100%'>
												<Image src='/Instagram.png' alt="" fill style={{ objectFit: 'contain'}}/>
											</Center>
										</Link>
									</Box>
								</Flex>
							</Box>
						</VStack>
				</Box>
			</Box>
		</Flex>
	</ChakraProvider>
		</>
  );
};
