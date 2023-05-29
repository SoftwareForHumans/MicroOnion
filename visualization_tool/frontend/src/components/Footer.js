function Footer(){
  const year = new Date().getFullYear();

  return <footer>{`Copyright © MicroOnion ${year}`}</footer>;
}

export default Footer;