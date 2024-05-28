import { Header } from '../../../Components/Header';
import * as _ from './style';
import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@team-return/design-system';
import { usePresignedUrl } from '../../../Apis/Files';
import { Link } from 'react-router-dom';

export function NoticeWritePage() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [inputCount, setInputCount] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [attachments, setAttachments] = useState<File[]>([]);

	// const fileName = jsonData.files[0].file_name;

	const { mutate: getPresignedUrl } = usePresignedUrl();
	// const { mutate } = useUpload(attachments, { onSuccess: (e) => {} });

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

	// let files_: any;

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
		// console.log(data);
		// writeNotice();
		getPresignedUrl(attachments);
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
								/>
								<_.InputCount>{inputCount}자/1000</_.InputCount>
							</_.InputWrapper>
						</_.TextWrap>
						<_.FileWrap>
							<_.Text>첨부파일</_.Text>
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
						</_.FileWrap>
						<_.ButtonWrap>
							<Link to={'/Notice'}>
								<Button onClick={handleNoticeSubmit}>
									공지 등록하기
								</Button>
							</Link>
						</_.ButtonWrap>
					</_.ContentWrap>
				</_.Box>
			</_.Wrapper>
		</>
	);
}
