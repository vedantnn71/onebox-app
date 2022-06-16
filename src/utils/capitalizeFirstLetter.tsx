const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toLocaleUpperCase() + value.slice(1);
};

export default capitalizeFirstLetter;
