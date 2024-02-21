import { Header } from "../../Components/Header"
import * as _ from './style';
import styled from "styled-components";
import { useRef, useState } from "react";
import { Button } from "@team-return/design-system";


export function NoticePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputCount, setInputCount] = useState(0);

    const handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const onInputHandler = (e: any) => {
        setInputCount(e.target.value.length);
        console.log(inputCount)
    }

    return (
        <>
            <Header />
            <_.Wrapper>
                <Box>
                    <Title>공지 작성하기</Title>
                    <ContentWrap>
                        <WriteDateWrap>
                            <Text>작성일</Text>
                            <Text>2024-01-16</Text>
                        </WriteDateWrap>
                        <TitleWrap>
                            <Text>제목</Text>
                            <Input placeholder="공지 제목을 입력하세요"></Input>
                        </TitleWrap>
                        <TextWrap>
                            <Text>내용</Text>
                            <InputWrapper>
                                <TextInput
                                    placeholder="공지 내용을 입력하세요"
                                    onChange={onInputHandler}
                                    maxLength={1000}
                                >
                                </TextInput>
                                <div style={{fontSize: '16px', fontWeight: '500', marginLeft: 'auto'}}>{inputCount}/1000</div>
                            </InputWrapper>
                        </TextWrap>
                        <FileWrap>
                            <Text>첨부파일</Text>
                            <AddFile onClick={handleAddFileClick}>파일 추가하기</AddFile>
                            <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
                        </FileWrap>
                        <ButtonWrap>
                            <Button>공지 등록하기</Button>
                        </ButtonWrap>
                    </ContentWrap>
                </Box>
            </_.Wrapper>
        </>
    )
}

const Box = styled.div`
    width: 980px;
    height: 850px;
    border: 1px solid #E5E5E5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 23px;
    line-height: 36px;
    margin-left: 24px;
    align-self: flex-start;
    margin-bottom: 25px;
`;

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
`;

const WriteDateWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 56px;
    align-items: center;
`;

const Text = styled.div`
    font-size: 23px;
    font-weight: 600;
`;

const TitleWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
    align-items: center;
`;

const Input = styled.input`
    width: 545px;
    height: 43px;
    border: 1px solid #999999;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 4px;
`;

const TextWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
`;

const InputWrapper = styled.div`
    width: 545px;
    height: 400px;
    border: 1px solid #999999;
    border-radius: 4px;
    padding: 10px;
    overflow: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const TextInput = styled.textarea`
    width: 100%;
    height: 90%;
    font-size: 16px;
    border: none;
    resize: none;
`;

const FileWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 37px;
    align-items: center;
`;

const AddFile = styled.div`
    width: 550px;
    height: 43px;
    background-color: #FAFAFA;
    cursor: pointer;
    font-size: 16px;
    align-items: center;
    display: flex;
    padding-left: 16px;
    font-weight: 400;
`;

const ButtonWrap = styled.div`
    margin-top: 68px;
    margin-left: auto;
`;