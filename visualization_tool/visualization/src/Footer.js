function Footer(){
    const year = new Date().getFullYear();

  return <footer>{`Copyright © FEUP MIEIC ${year}`}</footer>;
}

export default Footer;