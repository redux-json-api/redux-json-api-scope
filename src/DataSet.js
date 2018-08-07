/* @flow */

import { PureComponent, type ComponentType } from 'react';
import { connect } from 'react-redux';
import type { JSONAPIResource, JSONAPIResourceIdentifier } from 'json-api';
import type { RenderProp } from './Query';
import { selectResources } from './selectors';

type CommonProps = {|
  children: RenderProp,
  loading: boolean,
|};

type ConnectedProps = {|
  ...CommonProps,
  resources: Array<JSONAPIResource>
|};

type Props = {|
  ...CommonProps,
  resourceIds: Array<JSONAPIResourceIdentifier>
|};

export class DataSet extends PureComponent<ConnectedProps> {
  static defaultProps = {
    loading: false,
  };

  render() {
    const { children, loading, resources } = this.props;
    return children({
      loading,
      resources,
    });
  }
}

const mapStateToProps = (state, props) => ({
  resources: selectResources(state, props),
});

export default (connect(mapStateToProps)(DataSet): ComponentType<Props>);
