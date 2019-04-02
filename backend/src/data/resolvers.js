import { getString } from "./connectors";
import { getSchools, getWithinDistance } from "./dbConnect";

const resolvers = {
  Query: {
    testString(_, args) {
      return getString(args);
    },
    async findSchoolByName(_, args) {
      try {
        const results = await getSchools(args);
        return results;
      } catch (error) {
        console.log(error);
      }
    },
    async findWithinDistance(_, args) {
      try {
        const results = await getWithinDistance(args);
        return results;
      } catch (error) {
        console.log(error);
      }
    }
  },
  School: {
    name(school) {
      return school.ARCO_name;
    },
    blurb(school) {
      return school.RC_profile;
    },
    state(school) {
      return school.state;
    },
    distance(school) {
      return Math.round(((school.dist.calculated / 1609.344) * 100) / 100);
    }
  }
};

export default resolvers;
