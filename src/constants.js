export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'transparent',
      color: state.isSelected ? '#fff' : '#000',
      padding: '8px',
    }),
  };