import getDisplayName from '../utils/getDisplayName';
import shallowEqualScalar from '../utils/shallowEqualScalar';

export default function createConnectDecorator(React, Connector) {
  const { Component } = React;

  return function connect(select, actionCreators) {
    return DecoratedComponent => class ConnectorDecorator extends Component {
      static displayName = `Connector(${getDisplayName(DecoratedComponent)})`;

      shouldComponentUpdate(nextProps) {
        return !shallowEqualScalar(this.props, nextProps);
      }

      render() {
        return (
          <Connector
            select={state => select(state, this.props)}
            actionCreators={actionCreators}
          >
            {stuff => <DecoratedComponent {...stuff} {...this.props} />}
          </Connector>
        );
      }
    };
  };
}
