import styled from './input.module.scss';
import Link from "next/link";
import React, { useState, useRef } from 'react';
import axios from "axios";
import Select, { MultiValue } from 'react-select';
import Image from 'next/image';
import { Button} from '@chakra-ui/react';
import { Box, Text, Flex, Center, Divider, HStack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, Slider, SliderMark, SliderThumb, Tooltip, SliderTrack, SliderFilledTrack, ChakraProvider, Spinner} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faImage, faFileArrowDown, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import theme from "./theme";
import { FaFacebook} from 'react-icons/fa';
import Layout from '../components/Layout'
import { Value } from 'sass';

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
  const [photo, setPhoto] =useState<string>('');
  const [result_photo, setResultPhoto] =useState<string>('');
	const myLoader = ({ src }) => {
		return `${src}`
	}
	const [parameter, setParameter] = useState<ParameterObject>({mosaic_type: '0', strength: '1'});
	const [adapt, setAdapt] = useState<OptionAdapt[]>([{value: '1', label: '1'},{value: '2', label: '2'}]);
	const [person, setPerson] = useState<string>(',');
  const [showTooltip, setShowTooltip] = React.useState(false);
	const [loading, setLoading] = useState<boolean>();
	const [loading2, setLoading2] = useState<boolean>();
	const [max_strength, setMax_strength] = useState<string>('10');
	const [showImage, setShowImage] = useState<boolean>();
	const [showImage2, setShowImage2] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const selectRef1 = useRef(null);
	const selectRef2 = useRef(null);
	const selectRef3 = useRef(null);

	const stamp_option: OptionAdapt[] = [
		{ value: "2", label: "/smiling_face_with_smiling_eyes_3d.png"},
		{ value: "3", label: "/star_3d.png"},
		{ value: "4", label: "/heart_suit_3d.png"},
	];

	const option_type = [
		{value: '1', label: 'mosaic'},
		{value: '2', label: 'stamp'}
	];

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
			setShowImage(false);
			setShowImage2(false);
			selectRef1.current.clearValue();
			selectRef2.current.clearValue();
			selectRef3.current.clearValue();
			return;
		}
		const headers = { 'X-Api-Key': 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg'}
		const data = await fetch(`http://127.0.0.1:8000/mosaics/`, { headers: headers})
		setShowImage(true);
		setShowImage2(false);
		setLoading(true);
		selectRef1.current.clearValue();
		selectRef2.current.clearValue();
		selectRef3.current.clearValue();
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
					'X-Api-Key' : 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg',
				},
			}
		)
		const res = await fetch("http://127.0.0.1:8000/mosaics/", { headers: headers});
		const users = await res.json();
		const photosrc = "http://127.0.0.1:8000" + users["rectangle"];
		const active_user = users["active_number"];
		setMax_strength(users["max_strength"])
		for(let i = 0; i < Number(active_user); i++){
			if(i == 0){
				setAdapt((adapt => [{value: `${i}`, label: `${i+1}`}]));
			}
			else{
				setAdapt((adapt => [...adapt,{value: `${i}`, label: `${i+1}`}]));
			}
		}
    setPhoto(photosrc); 
		setLoading(false);
  }

  const onClickChangePhoto = async() => {
		if (!inputRef.current) return;
		selectRef1.current.clearValue();
		selectRef2.current.clearValue();
		selectRef3.current.clearValue();
		setLoading2(true);
    const formData = new FormData();
		//クリックと同時に画像をバックエンドに送信
		formData.append('image',inputRef.current.files[0]);
		formData.append('mosaic_type', String(parameter.mosaic_type));
		formData.append('strength', String(parameter.strength));
		formData.append('rect_number', person);
    await axios.post(
			'http://127.0.0.1:8000/mosaics/',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
						'X-Api-Key' : 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg',
          },
        }
      )
			onClickApi();
			setShowImage2(true);
			setLoading2(false);
  }
	const onClickApi = async() => {
		const headers = { 'X-Api-Key': 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg'}
		try {
		let res = await fetch("http://127.0.0.1:8000/mosaics/", { headers: headers});
		// let res = await fetch("http://127.0.0.1:8000/mosaics/", {headers: {'X-API-KEY': 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg'}});
		let users = await res.json();
		let photosrc = "http://127.0.0.1:8000" + users["result"];
		setResultPhoto(photosrc);
	} catch (err) { console.log('error'); }
	};

	const onChangeType = (value: string) => {
    const param_type: string = value;
		setParameter({...parameter, mosaic_type: String(value)});
  }

	const onChangeStamp = (e: OptionAdapt) => {
    const param_type: string = e.value;
		setParameter({...parameter, mosaic_type: String(e.value)});
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

	const fileUpload = () => {
    inputRef.current.click();
  };

	const onClickDownload = async(): Promise<File> => {
		const headers = { 'X-Api-Key': 's0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg'}
		let res = await fetch("http://127.0.0.1:8000/mosaics/", { headers: headers});
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

const FormatOptionLabel = ({ option }: { option: OptionAdapt }) => (
  <Box>
    <Image src={option.label} alt="stamp" width={30} height={30}/>
  </Box>
);

	
  return (
	<>
	<ChakraProvider theme={theme}>
		<Layout> </Layout>
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
							<input hidden ref={inputRef} type="file" name="image" accept="image/*" onChange={onFileInputChange}/>
						</Box>
					<Box width="100%" position="relative" height="300px">
							{loading ? (
								<Center h="100%">
									<Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl"/>
								</Center>
							):(
								showImage ? (
									<Image loader={myLoader} src={photo} alt="input picture" unoptimized={true} fill style={{ objectFit: 'contain'}}/>
								):(
									<Center h="100%">
										<FontAwesomeIcon icon={faImage} size="3x"/>
									</Center>
								)
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
											<Slider id='slider' step={1} defaultValue={1} min={1} max={Number(max_strength)} colorScheme='teal' onChange={(e) => onChangeStrength(String(e))} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
												<SliderMark value={1} mt='1' ml='-2.5' fontSize="11px">低</SliderMark>
												<SliderMark value={Number(max_strength)/2} mt='1' ml='-2.5' fontSize="11px">中</SliderMark>
												<SliderMark value={Number(max_strength)} mt='1' ml='-2.5' fontSize="11px">高</SliderMark>
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
													<Select instanceId="selectbox" ref={selectRef1} onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
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
											<Slider id='slider' step={1} defaultValue={1} min={1} max={Number(max_strength)} colorScheme='teal' onChange={(e) => onChangeStrength(String(e))} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
											<SliderMark value={1} mt='1' ml='-2.5' fontSize="11px">低</SliderMark>
												<SliderMark value={Number(max_strength)/2} mt='1' ml='-2.5' fontSize="11px">中</SliderMark>
												<SliderMark value={Number(max_strength)} mt='1' ml='-2.5' fontSize="11px">高</SliderMark>
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
											<Select instanceId="selectbox" ref={selectRef2} onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
										</Box>
									</Center>
									<Center w="25%" pl="10%">
										<Button colorScheme='teal' variant='solid' onClick={onClickChangePhoto}>加工する</Button>
									</Center>
									</VStack>
									</TabPanel>
									<TabPanel>
										<VStack spacing="2%" align='stretch' w="100%">
										<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%">種類</Text>
										<Center>
											<Box w="80%">
												<Select instanceId="selectbox" onChange={(e)=>{onChangeStamp(e)}} options={stamp_option} formatOptionLabel={(option) => (<FormatOptionLabel option={option} />)}/>
											</Box>
										</Center>
										<Text as='b' color="blackAlpha.600" fontSize="17px" pl="10%">加工しない人</Text>
										<Center>
											<Box w="80%">
												<Select instanceId="selectbox" ref={selectRef3} onChange={(e)=>{onChangeNumber(e)}} options={adapt} isMulti/>
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
					<Center h="100%" position="relative">
						{loading2 ? (
								<Center>
									<Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl"/>
								</Center>
							):(
								showImage2 ? (
									result_photo ? (
										<Image loader={myLoader} src={result_photo} alt="input picture" unoptimized={true} fill style={{ objectFit: 'contain'}}/>
									):(
										<Center h="100%">
											<FontAwesomeIcon icon={faFaceSmile} size="3x"/>
										</Center>
									)
								):(
									<Center h="100%">
										<FontAwesomeIcon icon={faFaceSmile} size="3x"/>
									</Center>
								)
							)}
					</Center>
				</Box>
				<Center>
					<Divider w="80%" borderColor="gray" opacity="1" p="1"/>
				</Center>
				<Center>
					<Box width="80%" height="100px" rounded="md">
							<Box w="50%" mt="10px">
								{showImage2 ? (
									<Button colorScheme='teal' variant='solid' onClick={onClickDownload}><FontAwesomeIcon icon={faFileArrowDown}/><Text m="3px">ダウンロード</Text></Button>
								):(
									<Box></Box>
								)}
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
												<Image src='/Twitter.png' alt="" width={100} height={100}/>
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
												<Image src='/Instagram.png' alt="" width={100} height={100}/>
											</Center>
										</Link>
									</Box>
									<Box position="relative" w='50px' h="50px" mr='10px' ml='10px'> {/* instagram29px以上 */}
										<Link href='https://timeline.line.me/social-plugin/share?url=&text='>
											<Center h='100%' w='100%'>
												<Image src='/LINE.png' alt="" width={100} height={100}/>
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
