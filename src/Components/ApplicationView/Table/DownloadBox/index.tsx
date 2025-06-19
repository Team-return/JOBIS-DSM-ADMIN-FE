import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';
import { Button, Icon, Stack } from '@team-return/design-system';
import * as _ from '../style';

interface DownloadBoxProps {
	application: any; // ApplicationResponse의 개별 항목 타입
	downloadBoxView: number;
	setDownloadBoxView: (value: number) => void;
	fileDownloadAPI: (url: string, name: string) => void;
}

export function DownloadBox({
	application,
	downloadBoxView,
	setDownloadBoxView,
	fileDownloadAPI,
}: DownloadBoxProps) {
	/** 다운로드 박스를 껐다키는 함수입니다. */
	const changeDownloadBoxView = () => {
		setDownloadBoxView(
			application.application_id === downloadBoxView
				? 0
				: application.application_id
		);
	};

	/** 다운로드 박스를 끄는 함수입니다. */
	const changeDownloadBoxDown = () => {
		if (application.application_id === downloadBoxView) {
			setDownloadBoxView(0);
		}
	};

	/** useOnClickOutside 훅을 컴포넌트 최상위에서 사용 */
	const downloadBoxRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(downloadBoxRef, () => {
		setTimeout(changeDownloadBoxDown);
	});

	/** URL 타입의 첨부파일을 필터링합니다. */
	const urlApplication = application.attachments.filter(
		(urls: any) => urls.type === 'URL'
	);
	/** FILE 타입의 첨부파일을 필터링합니다. */
	const fileApplication = application.attachments.filter(
		(urls: any) => urls.type === 'FILE'
	);

	return (
		<_.OpenBoxWrapper>
			{application.attachments.length !== 0 ? (
				<_.UnfoldImgWrapper
					onClick={
						downloadBoxView !== application.application_id
							? changeDownloadBoxView
							: () => {}
					}
				>
					<div>
						{downloadBoxView === application.application_id
							? '닫기'
							: '펼쳐보기'}
					</div>
					<Icon
						icon="Chevron"
						color="gray60"
						direction={
							downloadBoxView === application.application_id
								? 'top'
								: 'bottom'
						}
					/>
				</_.UnfoldImgWrapper>
			) : (
				<_.NotingFileText>첨부파일 없음</_.NotingFileText>
			)}

			{downloadBoxView === application.application_id && (
				<_.DownLoadWrapper ref={downloadBoxRef}>
					{urlApplication.length !== 0 && (
						<_.MiddleText>URL</_.MiddleText>
					)}
					{urlApplication.map((urls: any, i: number) => {
						return (
							<_.FileDownloadWrapper key={i}>
								<Stack>
									<_.CountNum>{i + 1}</_.CountNum>
									<div
										style={{
											width: '300px',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											textOverflow: 'ellipsis',
											wordBreak: 'break-all',
										}}
									>
										{urls.url}
									</div>
								</Stack>
								<Button
									size="S"
									onClick={() => {
										window.open(
											urls.url,
											'_blank',
											'noopener, noreferrer'
										);
									}}
								>
									링크 이동
								</Button>
							</_.FileDownloadWrapper>
						);
					})}
					{fileApplication.length !== 0 && (
						<_.MiddleText style={{ margin: '20px 0 10px 25px' }}>
							첨부파일
						</_.MiddleText>
					)}
					{fileApplication.map((urls: any, i: number) => {
						const nameArray = decodeURI(urls.url).split('/');
						return (
							<_.FileDownloadWrapper key={i}>
								<Stack>
									<_.CountNum>{i + 1}</_.CountNum>
									<div
										style={{
											width: '300px',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											textOverflow: 'ellipsis',
											wordBreak: 'break-all',
										}}
									>
										{nameArray[
											nameArray.length - 1
										].substring(37)}
									</div>
								</Stack>
								<Button
									size="S"
									onClick={() =>
										fileDownloadAPI(
											urls.url,
											nameArray[nameArray.length - 1]
										)
									}
								>
									<Icon
										icon="FileEarmarkArrowDown"
										size={16}
										color="gray10"
									/>
									다운
								</Button>
							</_.FileDownloadWrapper>
						);
					})}
				</_.DownLoadWrapper>
			)}
		</_.OpenBoxWrapper>
	);
}
