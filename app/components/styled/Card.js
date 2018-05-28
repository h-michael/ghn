// @flow

import styled from 'styled-components'

export const Card = styled.div`
  margin-left: 8px;
  margin-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  max-width: 700px;
  border: none;
  border-radius: 0.3em;
  box-shadow: 0 1px 3px 0 #d4d4d5;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 30px 1fr 30px;
`
export const IconArea = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  text-align: center;
  display: flex;
  align-items: center;
`
export const IconWrapper = styled.div`
  flex: 1;
`
export const ContentArea = styled.div`
  grid-row 1 / 2;
  grid-column: 2 / 3;
  cursor: pointer;
`
export const ActionArea = styled.div`
  grid-row 1 / 2;
  grid-column: 3 / 4;
`
