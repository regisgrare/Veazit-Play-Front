import { useContext, useState } from 'react';

import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Text, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

export default function ParameterScreen(props) {

  const [myImage, setMyImage] = useState('https://res.cloudinary.com/dualrskkc/image/upload/v1646863162/veazit/anonymous_ra8ndn.png');


  var avatars = ['https://res.cloudinary.com/dualrskkc/image/upload/v1646862951/veazit/avatar/alchemist_1_bkdg4b.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862951/veazit/avatar/alchemist_xd3gur.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/beaver_cby5ss.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862951/veazit/avatar/boar_qmblfj.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862951/veazit/avatar/buffalo_ilzpz3.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862951/veazit/avatar/camel_miafz5.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/chicken_vacpnk.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cosmonaut_1_pangdy.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cosmonaut_ebpzom.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cow_bfyyaz.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/crocodile_llthmk.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cyborg_1_fni5gc.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cyborg_2_rrggpv.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cyborg_3_idtwkf.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/cyborg_lskvaw.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/deer_pmckwi.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/duck_xothfb.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/eagle_vdt8dv.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/elf_1_oxfpht.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/elf_d5bmag.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/fox_dvfvu0.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/frog_shulci.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862952/veazit/avatar/gamer_1_fm9lav.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/gamer_zjkn3r.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/goat_o3rysd.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/gorilla_dl1w4d.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/grizzly-bear_hfvo44.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/hamster_utmxpl.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/hippo_d4jowl.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/king_r0hf2c.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/knight_1_w13u00.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/knight_ezlsdt.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/koala_ocq7f6.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/lion_fk2mbt.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862953/veazit/avatar/magician_1_cckimy.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/magician_yiedl3.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/military_1_ciuvvk.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/military_jvh1ee.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/monkey_op4vea.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/nerd_1_tmorjx.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/nerd_vrn6em.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/ninja_1_tdum6d.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/ninja_bub9vs.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862954/veazit/avatar/orc_1_y9es1z.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/orc_pjt48g.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/panda_gjk2b2.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/penguin_s8ugd8.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/pig_qjbctt.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/pirate_1_jfx2gw.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/pirate_fzd7wu.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/queen_mlygmo.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/rabbit_zgaqaz.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/rat_qscyfm.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/robot_1_epvx4i.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/robot_apzzqa.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/samurai_1_l9tvlz.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/samurai_tjrc1e.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/scientist_1_t6x4qs.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862955/veazit/avatar/scientist_wq89sz.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/skeleton_1_qqexhg.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/skeleton_yebagl.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/snake_lwm0ne.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/spy_1_ummxh7.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/spy_qz6ej1.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/superhero_1_bo5bdb.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/superhero_pgjpoe.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/tiger_g07hrt.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/viking_1_bvlsom.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/viking_xzmhez.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862956/veazit/avatar/walrus_ydcnnj.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/warrior_1_wfkqtr.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/warrior_stjfc5.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/wizard_1_n9cpvo.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/wizard_t3jybt.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/wolf_ofn99t.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/zombie_1_obosgu.png',
    'https://res.cloudinary.com/dualrskkc/image/upload/v1646862957/veazit/avatar/zombie_qq1bh2.png',
  ]

  var listAvatar = avatars.map((avatar, i) => {

    return (
      <Avatar
        key={i}
        source={{ uri: avatar }}
        size={100}
        rounded={true}
        containerStyle={{
          borderColor: 'white',
          borderStyle: 'solid',
          borderWidth: 5,
          margin: 2
        }}

      />
    )
  })
  const theme = useContext(themeContext);

  return (
    <View style={[styles.content, { backgroundColor: theme.background }]}>

      <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: 50 }}>
        <Text style={[styles.contentTitle, { color: theme.color }]}>Ton avatar actuel:</Text>

        <Avatar
          source={{ uri: myImage }}
          size={100}
          rounded={true}
          containerStyle={{
            borderColor: theme.color,
            borderStyle: 'solid',
            borderWidth: 4,
          }}
        />
      </View>

      <View style={{ flex: 1, marginTop: 20, marginBottom: '30%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ marginBottom: 10, }}>
          <Text style={[styles.contentTitle, { color: theme.color }]}>Choose your Avatar !</Text>
        </View>

        <ScrollView >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {listAvatar}
          </View>
        </ScrollView>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation', { screen: 'ConnectScreen' })}>
          <View style={[styles.buttonPrevious, { borderColor: theme.color }]}>
            <Icon name='arrow-left' size={24} color={theme.color} />
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 16,
    fontFamily: "PressStart2P_400Regular",
    marginBottom: 20
  },
  buttonPrevious: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'row'
  },
});