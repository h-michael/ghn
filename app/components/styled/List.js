// @flow

import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50px 1fr;
`

export const SideBar = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  background-color: red;
`
export const Content = styled.div`
  grid-row 1 / 2;
  grid-column: 2 / 3;
`
