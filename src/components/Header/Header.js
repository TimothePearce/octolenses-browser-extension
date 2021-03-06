import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { capitalize } from 'lodash';

import { SettingsModal } from '../SettingsModal';

import './Header.scss';

@connect(
  ({ navigation }) => ({ page: navigation.page }),
  ({ navigation }) => ({ navigateTo: navigation.navigateTo })
)
export class Header extends React.Component {
  state = {
    settingsModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ settingsModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ settingsModalIsOpen: false });
  };

  render() {
    const { settingsModalIsOpen } = this.state;

    return (
      <React.Fragment>
        <div className="Header">
          <div>
            <h1 className="Header__Title">
              <i className="fab fa-github" />
              <span>OctoLenses</span>
            </h1>
            <div className="Header__Tabs">
              {this.renderLink('dashboard')}
              {this.renderLink('discover')}
              <a onClick={this.openModal}>
                <i className="fa fa-cog" />
              </a>
            </div>
          </div>
        </div>
        {settingsModalIsOpen && <SettingsModal onClose={this.closeModal} />}
      </React.Fragment>
    );
  }

  renderLink(name) {
    const { page, navigateTo } = this.props;
    return (
      <a
        className={cx(page === name && 'active')}
        onClick={() => navigateTo(name)}
      >
        {capitalize(name)}
      </a>
    );
  }
}
