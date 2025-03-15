const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // update logic check token => if no token => /login
  const AuthComponent = (props: P) => {
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
