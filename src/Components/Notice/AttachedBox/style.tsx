import styled from 'styled-components';

export const AttachedWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: auto;
	margin-top: 32px;
	border-top: 2px solid #135c9d;
	border-bottom: 1px solid #135c9d;
	padding: 16px;
	gap: 20px;
`;

export const AttachmentTitle = styled.div`
	font-weight: 500;
	font-size: 18px;
`;

export const Attachments = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	justify-content: center;
`;

export const Attachment = styled.div`
	display: flex;
	gap: 7px;
	align-items: center;
`;
