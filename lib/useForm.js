const useForm = (initial = []) => {
  //
  // Email Validation
  //
  const validEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email) || email.length < 10) {
      return true;
    } else {
      return false;
    }
  };
  // Return
  return {
    validEmail,
  };
};
export default useForm;
