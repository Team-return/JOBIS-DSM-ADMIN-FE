import { Header } from '../../../Components/Header';
import * as _ from './style';
import { useEffect, useState } from 'react';
import { Button } from '@team-return/design-system';
import { usePresignedUrl } from '../../../Apis/Files';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AttachmentRequest } from '../../../Apis/Notices/request';
import { useNoticeEditData } from '../../../Apis/Notices';
import { useForm } from '../../../Hooks/useForm';

export function NoticeEditPage() {
	const location = useLocation();
	const [inputCount, setInputCount] = useState<number>(0);

	const { title, content, created_at, attachments } = location.state || {};
	const { form: noticeEditForm, handleChange } = useForm({
		editTitle: title || '',
		editContent: content || '',
		editCreated_at: created_at || '',
		editAttachments: attachments || [],
	});

	const [editAttachments, setEditAttachments] = useState<any>(
		noticeEditForm.editAttachments
	);

	const [presignedUrls, setPresignedUrls] = useState<AttachmentRequest[]>([]);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { mutate: editNotice } = useNoticeEditData(id || '');
	const { mutate: getPresignedUrl, data } = usePresignedUrl();

	useEffect(() => {
		if (data) {
			const { presignedUrls } = data;
			setPresignedUrls(
				presignedUrls.urls.map(({ file_path }) => ({
					type: 'FILE',
					url: file_path,
				}))
			);
		}
	}, [data]);

	useEffect(() => {
		if (presignedUrls.length !== 0) {
			const editedAttachments = [...editAttachments, ...presignedUrls];
			setEditAttachments(editedAttachments);
		}
	}, [presignedUrls]);

	const handleNoticeSubmit = () => {
		editNotice({
			title: noticeEditForm.editTitle,
			content: noticeEditForm.editContent,
			attachments: editAttachments,
		});
		navigate('/Notice');
	};

	return (
		<>
			<Header />
			<_.Wrapper>
				<_.Box>
					<_.Title>공지 수정하기</_.Title>
					<_.ContentWrap>
						<_.WriteDateWrap>
							<_.Text>작성일</_.Text>
							<_.Text>{noticeEditForm.editCreated_at}</_.Text>
						</_.WriteDateWrap>
						<_.TitleWrap>
							<_.Text>제목</_.Text>
							<_.Input
								placeholder="공지 제목을 입력하세요"
								value={noticeEditForm.editTitle}
								name="editTitle"
								onChange={handleChange}
							/>
						</_.TitleWrap>
						<_.TextWrap>
							<_.Text>내용</_.Text>
							<_.InputWrapper>
								<_.TextInput
									placeholder="공지 내용을 입력하세요"
									maxLength={999}
									value={noticeEditForm.editContent}
									onChange={handleChange}
									name="editContent"
									onInput={(
										e: React.ChangeEvent<HTMLTextAreaElement>
									) => setInputCount(e.target.value.length)}
									as="textarea"
								/>
								<_.InputCount>{inputCount}자/1000</_.InputCount>
							</_.InputWrapper>
						</_.TextWrap>
						{/* <_.FileWrap>
							<_.Text>첨부파일</_.Text>
							<_.AddFileWrapper>
								{editAttachments.map(
									(file: any, index: number) => (
										<_.AddFile key={index}>
											{file.url
												? file_name_regex(file.url)
												: file_name_regex(file.name)}
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
						</_.FileWrap> */}
						<_.ButtonWrap>
							<div>
								<Button onClick={handleNoticeSubmit}>
									공지 수정하기
								</Button>
							</div>
						</_.ButtonWrap>
					</_.ContentWrap>
				</_.Box>
			</_.Wrapper>
		</>
	);
}
