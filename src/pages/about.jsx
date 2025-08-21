const AboutPage = () => {
  return (
    <div className='about'>
      <h1>About Crypt.now </h1>
      <p>
        Crypt.now is a simple React application that displays live
        cryptocurrency data using the CoinGecko API.
      </p>
      <p>
        You can explore the top cryptocurrencies by market cap, filter by name
        or symbol, and sort them by price, market cap, or 24-hour change.
      </p>
      <p>
        This project was built just to practice 
        components, state management, and integrating with external APIs.
      </p>
      <p>
        Future features might include detailed coin views, favorites,
        pagination, and much more!
      </p>
    </div>
  );
};

export default AboutPage;