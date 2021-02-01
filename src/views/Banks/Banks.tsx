import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import Bank from '../Bank';
import BankCards from './BankCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const isLaunched = Date.now() >= config.baseLaunchDate.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <LaunchCountdown
            deadline={config.baseLaunchDate}
            description="Learn more"
            descriptionLink="http://www.blog.yflink.io/yflusd/"
          />
        </Page>
      </Switch>
    );
  }

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {!!account ? (
            <BankCards />
          ) : (
            <Center>
              <Button
                onClick={() => connect('injected')}
                text="Unlock Wallet"
                variant="secondary"
              />
            </Center>
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Banks;
