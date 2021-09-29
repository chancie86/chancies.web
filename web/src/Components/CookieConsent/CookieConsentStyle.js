const styles = {
  container: {
    backgroundColor: '#00d3ee',
    bottom: '0',
    color: '#ffffff',
    display: 'flex',
    flex: '1',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: '2em 0',
    position: 'fixed',
    width: '100%',
    zIndex: 1100,
  },
  content: {
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginRight: '2em',
  },
  title: {
    flexGrow: 1,
  },
  message: {
    padding: '1em 0',
  },
  close: {
    fontSize: '1.5rem',
    fontWeight: '500',
    height: '24px',
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '24px',
  },
};

export default styles;
