import { composeMocks, rest } from 'msw';

const { start } = composeMocks(
  rest.get(
    process.env.REACT_APP_CAREER_BASE_URL as string,
    (req, res, { json }) => {
      const id = req.query && req.query.get('id');

      const data = [
        {
          id: 404,
          title: 'CEO',
          department: 'UI / UX Design',
          level: 'experienced',
          summary:
            'The Design team plays an important role in Shopit. The team covers the entire range of product UI/UX design, including the user-growth, promotion, wallet and payment, checkout, retention, listings and users, search and recommendation etc. The team is also responsible for the branding visual identities and elements of Shopit, including logos, mascots, stickers, and internal physical products.',
          descriptions: [
            'Explore and optimize the visual design work flow/method and help team improving the efficiency of cooperation',
            'Act as a designer and one of the decision maker to define and design the key visual and guidance of each request from marketing and product, for better execution around the world',
            'Optimize and maintain the brand identity for each Shopit brands by using scientific and efficient methods',
          ],
          requirements: [
            'Bachelor degree or outstanding design skills with more than 2 years experience in marketing design / web design / mobile design',
            'Solid design philosophy, deep understanding and practical experience in marketing/branding design, user experience design and related fields',
            'Excellent communication and teamwork skills',
            'Passionate and detail-oriented',
            'Experience in design for e-commerce is a plus',
            'Experience in designing for global/regional/local markets is a plus',
            'Experience in project management is a plus',
            'Experience in photography/graphic design/motion design is a plus',
          ],
        },
        {
          id: 403,
          title: 'Customer Service Agent',
          department: 'Operations',
          level: 'entry',
          summary:
            'The Operation teams at Shopit covers the operational end-to-end process, from when the buyer searches for a product listed on the Shopit platform, to the moment the buyer receives the products. The team analyses and monitors operational KPIs across the region and conducts root cause analysis when operation performance fluctuates. The Operations team comprises Customer Service, Payment, Listings, Warehouse, Logistics, Seller Operations and Fraud.',
          descriptions: [
            'Primarily handle inquiries pertaining to orders, payments, shipping, vouchers and etc from both sellers and buyers via live chat',
            'Level 1 Customer Service is expected to provide First Contact Resolution (FCR) according to standard operating procedures. In the event of non-FCR, you are expected to follow up and respond back to users via callback or email',
            'Update case details appropriately, i.e. Gdocx, Salesforce and etc',
            'To meet Key Performance Indicators such as average handling time, FCR rate, email/chat response rate, customer satisfaction score and etc',
            'Communicate effectively by providing accurate information to Shopee users and external partners such as Poslaju and iPay88, where appropriate',
            'Communicate effectively with team members',
            'Take on ad-hoc projects/assignments',
          ],
          requirements: [
            'Passionate Diploma holder and fresh graduates are welcome to apply',
            'Business writing skill is mandatory',
            'Good typing skill',
            'Ability to work independently, flexible and adaptable',
            'Ability to multi-task, prioritize and manage time effectively',
            'Demonstrate teamwork all the time',
          ],
        },
      ];

      return res(json(id ? data.filter((job) => job.id === Number(id)) : data));
    }
  )
);

start();
