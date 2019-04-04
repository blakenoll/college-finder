import { gql } from "apollo-server";

// define your schema here
const typeDefs = gql`
  type Query {
    testString(text: String): String
    findSchoolByName(query: String): [School]
    findWithinDistance(zip: Int, miles: Int): [School]
  }

  type School {
    id: ID
    name: String
    city: String
    blurb: String
    address: String
    FAFSA: String
    state: String
    www_url: String
    scid: Int
    generalInfo: General
    academics: Academics
    financialAid: FinAid
    zip: String
    distance: Float
    geo: Geo
  }

  type General {
    primeofficer: String
    primetitle: String
    campus_enroll: String
    year_estab: Int
    main_phone: String
    adm_phone: String
  }

  type Academics {
    ave_fresh_GPA: String
    majors_highest_1: String
    majors_highest_2: String
    majors_highest_3: String
  }

  type FinAid {
    average_debt: String
    priority_date_1: String
    work_study: String
  }

  type Geo {
    lng: Float
    lat: Float
  }
`;

export default typeDefs;
