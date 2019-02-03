import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { Grid } from '@8base/boost';

import { UserDropdown } from './UserDropdown.js';
// import logo from 'images/8base-logo-red-black.svg';
// import styled from 'styled-components';

const HeaderTag = styled(Grid.Layout)({
  height: '6rem',
  padding: '0 2rem',
  backgroundColor: '#fff',
  borderBottom: '1px solid #D0D7DD',
});

// const HeaderLogoTag = styled('img')({
//   height: '3rem',
// });

// <HeaderLogoTag src={logo} alt="8base logo" />

// const Logo = styled.h3`
// font-size: 36px;
// color: #222d39;
// line-height: 1.3;
// `;

const Logo = styled('h3')`
  font-size: 36px;
  color: #222d39;
  line-height: 1.3;
`;
const LogoSub = styled('span')`
  font-size: 18px;
`;
const Wrap = styled('div')`
  padding: 0;
  a {
    text-decoration: none;
  }
`;

const Header = () => (
  <Grid.Box area="header">
    <HeaderTag columns="1fr auto" gap="lg">
      <Grid.Box justifyContent="center">
        <Wrap>
          <Link to="/">
            <Logo>
              Message <LogoSub>in a Bottle</LogoSub>
            </Logo>
          </Link>
        </Wrap>
      </Grid.Box>
      <Grid.Box justifyContent="center">
        <UserDropdown />
      </Grid.Box>
    </HeaderTag>
  </Grid.Box>
);

export { Header };
