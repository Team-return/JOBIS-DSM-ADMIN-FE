import { Dispatch, SetStateAction } from 'react';
import { editRecruitmentRequest } from '../../../Apis/Recruitments/request';
import { useModalContext } from '../../../Utils/Modal';
import { hiringProgress } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';
import selectIcon from '../../../Assets/SVG/selectIcon.svg';
import dndIcon from '../../../Assets/SVG/dndIcon.svg';
import * as _ from './style';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Stack } from '@team-return/design-system';

interface PropsType {
	hiringProgressArray: string[];
	setRecruitmentFormDetailInfo: Dispatch<
		SetStateAction<editRecruitmentRequest>
	>;
}

export function EditHiringProgressModal({
	hiringProgressArray,
	setRecruitmentFormDetailInfo,
}: PropsType) {
	const { closeModal } = useModalContext();
	const progressList = [
		'컬쳐핏면접',
		'서류전형',
		'과제 제출',
		'라이브코딩',
		'기술면접',
		'최종면접',
		'인적성 테스트',
		'AI면접',
		'코딩테스트',
	];

	const clickHiringProgress = (progressName: string) => {
		!hiringProgressArray.includes(
			getValueByKey(hiringProgress, progressName)
		)
			? setRecruitmentFormDetailInfo((recruitmentFormDetailInfo) => ({
					...recruitmentFormDetailInfo,
					hiring_progress: [
						...hiringProgressArray,
						getValueByKey(hiringProgress, progressName),
					],
			  }))
			: setRecruitmentFormDetailInfo((recruitmentFormDetailInfo) => ({
					...recruitmentFormDetailInfo,
					hiring_progress: hiringProgressArray.filter(
						(progress) =>
							progress !==
							getValueByKey(hiringProgress, progressName)
					),
			  }));
	};

	const reorder = (list: string[], startIndex: number, endIndex: number) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}
		setRecruitmentFormDetailInfo((recruitmentFormDetailInfo) => ({
			...recruitmentFormDetailInfo,
			hiring_progress: reorder(
				recruitmentFormDetailInfo.hiring_progress,
				result.source.index,
				result.destination.index
			),
		}));
	};

	return (
		<_.Container>
			<Stack direction="column" width={300}>
				<_.Title>채용 방법</_.Title>
				<_.DndWrapper>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{hiringProgressArray.map((item, index) => (
										<Draggable
											key={`item${index}`}
											draggableId={`item-${index}`}
											index={index}
										>
											{(provided) => (
												<_.DndItemWrapper
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<img src={dndIcon} alt="" />
													<_.DndText>
														{`${index + 1}. ${hiringProgress[item]}`}
													</_.DndText>
												</_.DndItemWrapper>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</_.DndWrapper>
			</Stack>
			<_.ProgressWrapper>
				<_.ProgressListWrapper>
					{progressList.map((progress, i) => {
						return (
							<_.Card
								key={i}
								onClick={() => {
									clickHiringProgress(progress);
								}}
								isSelect={hiringProgressArray.includes(
									getValueByKey(hiringProgress, progress)
								)}
							>
								{progress}
								{hiringProgressArray.includes(
									getValueByKey(hiringProgress, progress)
								) && (
									<_.SelectIconImg src={selectIcon} alt="" />
								)}
							</_.Card>
						);
					})}
				</_.ProgressListWrapper>
				<_.SuccessBtn onClick={closeModal}>확인</_.SuccessBtn>
			</_.ProgressWrapper>
		</_.Container>
	);
}
