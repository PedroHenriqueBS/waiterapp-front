import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    color: #fff;

    h1 {
      font-size: 32px;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
