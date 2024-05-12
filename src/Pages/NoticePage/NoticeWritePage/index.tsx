import { Header } from '../../../Components/Header';
import * as _ from './style';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@team-return/design-system';
import { useNoticeWriteData } from '../../../Apis/Notices';
import { usePresignedUrl } from '../../../Apis/Files';
import { useNavigate } from 'react-router-dom';
import { AttachmentRequest } from '../../../Apis/Notices/request';
import { Icon } from '@team-return/design-system';

export function NoticeWritePage() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [inputCount, setInputCount] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [attachments, setAttachments] = useState<File[]>([]);
	const [presignedUrls, setpresignedUrls] = useState<AttachmentRequest[]>([]);
	const navigate = useNavigate();

	const { mutate: writeNotice } = useNoticeWriteData();

	const { mutate: getPresignedUrl, data } = usePresignedUrl('EXTENSION_FILE');

	useEffect(() => {
		if (data) {
			const { presignedUrls } = data;
			setpresignedUrls(
				presignedUrls.urls.map(({ file_path }) => ({
					type: 'FILE',
					url: file_path,
				}))
			);
		}
	}, [data]);

	useEffect(() => {
		if (presignedUrls.length !== 0) {
			console.log('6', presignedUrls);

			writeNotice({
				title,
				content,
				attachments: presignedUrls,
			});
			navigate('/Notice');
		}
	}, [presignedUrls]);

	const getTodayDate = (): string => {
		const today = new Date();
		const year = today.getFullYear();
		let month = (today.getMonth() + 1).toString();
		let day = today.getDate().toString();

		if (month.length === 1) {
			month = '0' + month;
		}
		if (day.length === 1) {
			day = '0' + day;
		}

		return `${year}-${month}-${day}`;
	};

	const handleAddFileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const onInputHandler = (e: any) => {
		setInputCount(e.target.value.length);
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newAttachments = Array.from(e.target.files);
			setAttachments((prevAttachments) => [
				...prevAttachments,
				...newAttachments,
			]);
		}
	};

	const handleNoticeSubmit = () => {
		if (attachments.length > 0) {
			getPresignedUrl(attachments);
		}
	};

	const handleFileDelete = (index: number) => {
		const newAttachments = [...attachments];
		newAttachments.splice(index, 1);
		setAttachments(newAttachments);
	};

	return (
		<>
			<Header />
			<_.Wrapper>
				<_.Box>
					<_.Title>공지 작성하기</_.Title>
					<_.ContentWrap>
						<_.WriteDateWrap>
							<_.Text>작성일</_.Text>
							<_.Text>{getTodayDate()}</_.Text>
						</_.WriteDateWrap>
						<_.TitleWrap>
							<_.Text>제목</_.Text>
							<_.Input
								placeholder="공지 제목을 입력하세요"
								value={title}
								onChange={handleTitleChange}
							/>
						</_.TitleWrap>
						<_.TextWrap>
							<_.Text>내용</_.Text>
							<_.InputWrapper>
								<_.TextInput
									placeholder="공지 내용을 입력하세요"
									maxLength={999}
									value={content}
									onChange={handleContentChange}
									onInput={onInputHandler}
									as="textarea"
								/>
								<_.InputCount>{inputCount}자/1000</_.InputCount>
							</_.InputWrapper>
						</_.TextWrap>
						<_.FileWrap>
							<_.Text>첨부파일</_.Text>
							<_.AddFileWrapper>
								{attachments.map(
									(file: File, index: number) => (
										<_.AddFile key={index}>
											{file.name}
											<_.IconWrapper
												onClick={() =>
													handleFileDelete(index)
												}
											>
												<Icon
													icon="Trash"
													color={'gray10'}
												></Icon>
											</_.IconWrapper>
										</_.AddFile>
									)
								)}
								<_.AddFile onClick={handleAddFileClick}>
									파일 추가하기
								</_.AddFile>
								<input
									type="file"
									style={{ display: 'none' }}
									ref={fileInputRef}
									onChange={handleFileChange}
									multiple={true}
								/>
							</_.AddFileWrapper>
						</_.FileWrap>
						<_.ButtonWrap>
							<div>
								<Button onClick={handleNoticeSubmit}>
									공지 등록하기
								</Button>
							</div>
						</_.ButtonWrap>
					</_.ContentWrap>
				</_.Box>
			</_.Wrapper>
		</>
	);
}
