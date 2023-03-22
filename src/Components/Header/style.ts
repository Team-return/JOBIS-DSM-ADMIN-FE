import styled from 'styled-components';

export const Container = styled.header`
	position: fixed;
	display: flex;
	width: 100vw;
	height: 80px;
	background-color: #333333;
	top: 0;
	align-items: center;
    z-index: 99;
`;

export const LogoImg = styled.img`
	width: 142px;
	height: 38px;
    margin: 0px 70px;
`;

export const NavBtnWrapper = styled.div`
    display: flex;
`

export const NavBtn = styled.div<{ width: number, clicked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    font-weight: 400;
    height: 80px;
    width: ${(props) => props.width}px;
    background-color: ${(props) => props.clicked ? "#FFFFFF" : ""};
    color: ${(props) => props.clicked ? "#0F4C82" : "#FFFFFF"};
`