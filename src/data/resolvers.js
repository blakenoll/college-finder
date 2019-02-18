import { getString } from "./connectors";
import { getSchools, getInfo } from "./dbConnect";

const resolvers = {
  Query: {
    testString(_, args) {
      return getString(args);
    },
    async findSchoolByName(_, args) {
      const results = await getSchools(args);
      return results;
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
    async generalInfo(school) {
      const results = await getInfo(school.scid);
      return results;
    }
  }
};

export default resolvers;
