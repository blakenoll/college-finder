import { gql } from 'apollo-server';

// define your schema here 
const typeDefs = gql`
  type Query {
    testString(text: String): String
    findSchoolByName(query: String): [School]
  }
  type School {
    id: ID
    name: String
    city: String
    blurb: String
    address: String
    state: String
    www_url: String
    scid: Int
    generalInfo: General
  }
  type General {
    primeofficer: String
    primetitle: String
    year_estab: Int
    main_phone: String
    adm_phone: String
  }
`;


export default typeDefs;
