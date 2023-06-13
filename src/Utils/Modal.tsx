import { Button } from '@team-return/design-system';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

type ModalData = {
	children?: ReactNode;
	onCancel?: () => void;
	onSubmit?: () => void;
};

const ModalContext = createContext<{
	isOpen: boolean;
	openModal: (modalData: ModalData) => void;
	closeModal: () => void;
	modalData: ModalData;
}>({
	isOpen: false,
	openModal: () => {},
	closeModal: () => {},
	modalData: {} as ModalData,
});

/** 모달 Provider입니다. */
export const ModalContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState<ModalData>({});

	const openModal = ({ children, onCancel, onSubmit }: ModalData) => {
		setIsOpen(true);
		setModalData({
			children,
			onCancel,
			onSubmit,
		});
	};

	const closeModal = () => {
		setIsOpen(false);
		setModalData({});
	};

	return (
		<ModalContext.Provider
			value={{ isOpen, openModal, closeModal, modalData }}
		>
			{children}
		</ModalContext.Provider>
	);
};

/** 모달을 관리하기 위한 state입니다. */
export const useModalContext = () => useContext(ModalContext);

/** 기본 모달 틀을 지원하고 모달을 켜고 닫는 역할을 합니다. */
export const Modal = () => {
	const { isOpen, modalData, closeModal } = useModalContext();

	const { children, onCancel, onSubmit } = modalData;

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = 'auto';
			};
		}
	}, [isOpen]);

	if (!isOpen) {
		return <></>;
	}

	return (
		<Modals>
			<ModalDropdown onClick={closeModal} />
			<ModalContents>
				<div>{children}</div>
				{onCancel && onSubmit && (
					<ModalActions>
						<Button size="XS" kind="Gray" onClick={onCancel}>
							취소
						</Button>
						<Button size="XS" onClick={onSubmit}>
							확인
						</Button>
					</ModalActions>
				)}
			</ModalContents>
		</Modals>
	);
};

const Modals = styled.div`
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.6);
`;

const ModalDropdown = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`;

const ModalContents = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	min-width: 370px;
	padding: 30px 30px 25px 30px;
	overflow-y: scroll;
	background-color: #fff;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

const ModalActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 25px;
`;
