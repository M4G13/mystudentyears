import React, { useState } from "react";
import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { SelectList } from 'react-native-dropdown-select-list'

import style from "../styles/survey";

export default function Survey({ navigation }) {

  const [input, setInput] = useState("");
  const [selected, setSelected] = React.useState("");
  const schools = [{key:"1", value:"Aberdeen Grammar School"},{key:"2", value:"Aboyne Academy"},{key:"3", value:"Airdrie Academy"},{key:"4", value:"Alford Academy"},{key:"5", value:"All Saints Secondary School"},{key:"6", value:"Alloa Academy"},{key:"7", value:"Alness Academy"},{key:"8", value:"Alva Academy"},{key:"9", value:"Anderson High School"},{key:"10", value:"Annan Academy"},{key:"11", value:"Arbroath Academy"},{key:"12", value:"Arbroath High School"},{key:"13", value:"Ardnamurchan High School"},{key:"14", value:"Ardrossan Academy"},{key:"15", value:"Armadale Academy"},{key:"16", value:"Arran High School"},{key:"17", value:"Auchenharvie Academy"},{key:"18", value:"Auchmuty High School"},{key:"19", value:"Ayr Academy"},{key:"20", value:"Baldragon Academy"},{key:"21", value:"Balerno Community High School"},{key:"22", value:"Balfron High School"},{key:"23", value:"Balwearie High School"},{key:"24", value:"Banchory Academy"},{key:"25", value:"Banff Academy"},{key:"26", value:"Bannerman High School"},{key:"27", value:"Bannockburn High School"},{key:"28", value:"Barrhead High School"},{key:"29", value:"Bathgate Academy"},{key:"30", value:"Bearsden Academy"},{key:"31", value:"Beath High School"},{key:"32", value:"Beeslack Community High School"},{key:"33", value:"Bell Baxter High School"},{key:"34", value:"Bellahouston Academy"},{key:"35", value:"Bellshill Academy"},{key:"36", value:"Belmont Academy"},{key:"37", value:"Bertha Park High School"},{key:"38", value:"Berwickshire High School"},{key:"39", value:"Biggar High School"},{key:"40", value:"Bishopbriggs Academy"},{key:"41", value:"Blairgowrie High School"},{key:"42", value:"Bo'ness Academy"},{key:"43", value:"Boclair Academy"},{key:"44", value:"Boroughmuir High School"},{key:"45", value:"Brae High School"},{key:"46", value:"Braes High School"},{key:"47", value:"Braeview Academy"},{key:"48", value:"Braidhurst High School"},{key:"49", value:"Brannock High School"},{key:"50", value:"Breadalbane Academy"},{key:"51", value:"Brechin High School"},{key:"52", value:"Bridge Of Don Academy"},{key:"53", value:"Broughton High School"},{key:"54", value:"Broxburn Academy"},{key:"55", value:"Buckie High School"},{key:"56", value:"Bucksburn Academy"},{key:"57", value:"Calderglen High School"},{key:"58", value:"Calderhead High School"},{key:"59", value:"Calderside Academy"},{key:"60", value:"Caldervale High School"},{key:"61", value:"Campbeltown Grammar School"},{key:"62", value:"Cardinal Newman High School"},{key:"63", value:"Carluke High School"},{key:"64", value:"Carnoustie High School"},{key:"65", value:"Carrick Academy"},{key:"66", value:"Castle Douglas High School"},{key:"67", value:"Castlehead High School"},{key:"68", value:"Castlemilk High School"},{key:"69", value:"Cathkin High School"},{key:"70", value:"Charleston Academy"},{key:"71", value:"Chryston High School"},{key:"72", value:"Cleveden Secondary School"},{key:"73", value:"Clyde Valley High School"},{key:"74", value:"Clydebank High School"},{key:"75", value:"Clydeview Academy"},{key:"76", value:"Coatbridge High School"},{key:"77", value:"Coltness High School"},{key:"78", value:"Craigie High School"},{key:"79", value:"Craigmount High School"},{key:"80", value:"Craigroyston Community High School"},{key:"81", value:"Crieff High School"},{key:"82", value:"Culloden Academy"},{key:"83", value:"Cults Academy"},{key:"84", value:"Cumbernauld Academy"},{key:"85", value:"Currie Community High School"},{key:"86", value:"Dalbeattie High School"},{key:"87", value:"Dalkeith High School"},{key:"88", value:"Dalziel High School"},{key:"89", value:"Deans Community High School"},{key:"90", value:"Denny High School"},{key:"91", value:"Dingwall Academy"},{key:"92", value:"Doon Academy"},{key:"93", value:"Dornoch Academy"},{key:"94", value:"Douglas Academy"},{key:"95", value:"Douglas Ewart High School"},{key:"96", value:"Drumchapel High School"},{key:"97", value:"Drummond Community High School"},{key:"98", value:"Dumbarton Academy"},{key:"99", value:"Dumfries Academy"},{key:"100", value:"Dumfries High School"},{key:"101", value:"Dunbar Grammar School"},{key:"102", value:"Dunblane High School"},{key:"103", value:"Duncanrig Secondary School"},{key:"104", value:"Dunfermline High School"},{key:"105", value:"Dunoon Grammar School"},{key:"106", value:"Dyce Academy"},{key:"107", value:"Earlston High School"},{key:"108", value:"Eastbank Academy"},{key:"109", value:"Eastwood High School"},{key:"110", value:"Elgin Academy"},{key:"111", value:"Elgin High School"},{key:"112", value:"Ellon Academy"},{key:"113", value:"Eyemouth High School"},{key:"114", value:"Falkirk High School"},{key:"115", value:"Farr High School"},{key:"116", value:"Firrhill High School"},{key:"117", value:"Forfar Academy"},{key:"118", value:"Forres Academy"},{key:"119", value:"Forrester High School"},{key:"120", value:"Fortrose Academy"},{key:"121", value:"Fraserburgh Academy"},{key:"122", value:"Gairloch High School"},{key:"123", value:"Galashiels Academy"},{key:"124", value:"Garnock Community Campus"},{key:"125", value:"Girvan Academy"},{key:"126", value:"Glasgow Gaelic School"},{key:"127", value:"Glen Urquhart High School"},{key:"128", value:"Gleniffer High School"},{key:"129", value:"Glenrothes High School"},{key:"130", value:"Glenwood High School"},{key:"131", value:"Golspie High School"},{key:"132", value:"Govan High School"},{key:"133", value:"Gracemount High School"},{key:"134", value:"Graeme High School"},{key:"135", value:"Grange Academy"},{key:"136", value:"Grangemouth High School"},{key:"137", value:"Grantown Grammar School"},{key:"138", value:"Greenfaulds High School"},{key:"139", value:"Greenwood Academy"},{key:"140", value:"Grove Academy"},{key:"141", value:"Gryffe High School"},{key:"142", value:"Hamilton Grammar School"},{key:"143", value:"Harlaw Academy"},{key:"144", value:"Harris Academy"},{key:"145", value:"Hawick High School"},{key:"146", value:"Hazlehead Academy"},{key:"147", value:"Hermitage Academy"},{key:"148", value:"Hillhead High School"},{key:"149", value:"Hillpark Secondary School"},{key:"150", value:"Holy Cross High School"},{key:"151", value:"Holy Rood RC High School"},{key:"152", value:"Holyrood Secondary School"},{key:"153", value:"Hyndland Secondary School"},{key:"154", value:"Inveralmond Community High School"},{key:"155", value:"Inverclyde Academy"},{key:"156", value:"Invergordon Academy"},{key:"157", value:"Inverkeithing High School"},{key:"158", value:"Inverness High School"},{key:"159", value:"Inverness Royal Academy"},{key:"160", value:"Inverurie Academy"},{key:"161", value:"Irvine Royal Academy"},{key:"162", value:"Islay High School"},{key:"163", value:"James Gillespie's High School"},{key:"164", value:"Jedburgh Grammar School"},{key:"165", value:"John Paul Academy"},{key:"166", value:"Johnstone High School"},{key:"167", value:"Jordanhill School"},{key:"168", value:"Keith Grammar School"},{key:"169", value:"Kelso High School"},{key:"170", value:"Kemnay Academy"},{key:"171", value:"Kilmarnock Academy"},{key:"172", value:"Kilsyth Academy"},{key:"173", value:"Kilwinning Academy"},{key:"174", value:"King's Park Secondary School"},{key:"175", value:"Kingussie High School"},{key:"176", value:"Kinlochleven High School"},{key:"177", value:"Kinross High School"},{key:"178", value:"Kirkcaldy High School"},{key:"179", value:"Kirkcudbright Academy"},{key:"180", value:"Kirkintilloch High School"},{key:"181", value:"Kirkwall Grammar School"},{key:"182", value:"Knightswood Secondary School"},{key:"183", value:"Knox Academy"},{key:"184", value:"Kyle Academy"},{key:"185", value:"Lanark Grammar School"},{key:"186", value:"Langholm Academy"},{key:"187", value:"Larbert High School"},{key:"188", value:"Largs Academy"},{key:"189", value:"Larkhall Academy"},{key:"190", value:"Lasswade High School Centre"},{key:"191", value:"Leith Academy"},{key:"192", value:"Lenzie Academy"},{key:"193", value:"Lesmahagow High School"},{key:"194", value:"Levenmouth Academy"},{key:"195", value:"Liberton High School"},{key:"196", value:"Linlithgow Academy"},{key:"197", value:"Linwood High School"},{key:"198", value:"Lochaber High School"},{key:"199", value:"Lochend Community High School"},{key:"200", value:"Lochgelly High School"},{key:"201", value:"Lochgilphead High School"},{key:"202", value:"Lochside Academy"},{key:"203", value:"Lockerbie Academy"},{key:"204", value:"Lornshill Academy"},{key:"205", value:"Lossiemouth High School"},{key:"206", value:"Loudoun Academy"},{key:"207", value:"Lourdes Secondary School"},{key:"208", value:"Mackie Academy"},{key:"209", value:"Madras College"},{key:"210", value:"Mallaig High School"},{key:"211", value:"Marr College"},{key:"212", value:"McLaren High School"},{key:"213", value:"Mearns Academy"},{key:"214", value:"Mearns Castle High School"},{key:"215", value:"Meldrum Academy"},{key:"216", value:"Millburn Academy"},{key:"217", value:"Milne's High School"},{key:"218", value:"Mintlaw Academy"},{key:"219", value:"Moffat Academy"},{key:"220", value:"Monifieth High School"},{key:"221", value:"Montrose Academy"},{key:"222", value:"Morgan Academy"},{key:"223", value:"Musselburgh Grammar School"},{key:"224", value:"Nairn Academy"},{key:"225", value:"Newbattle High School"},{key:"226", value:"North Berwick High School"},{key:"227", value:"North West Community Campus"},{key:"228", value:"Notre Dame High School"},{key:"229", value:"Notre Dame High School"},{key:"230", value:"Oban High School"},{key:"231", value:"Oldmachar Academy"},{key:"232", value:"Our Lady & St Patrick's High School"},{key:"233", value:"Our Lady's High School - Cumbernauld"},{key:"234", value:"Our Lady's High School - Motherwell"},{key:"235", value:"Paisley Grammar School"},{key:"236", value:"Park Mains High School"},{key:"237", value:"Peebles High School"},{key:"238", value:"Penicuik High School"},{key:"239", value:"Perth Academy"},{key:"240", value:"Perth Grammar School"},{key:"241", value:"Perth High School"},{key:"242", value:"Peterhead Academy"},{key:"243", value:"Plockton High School"},{key:"244", value:"Port Glasgow High School"},{key:"245", value:"Portlethen Academy"},{key:"246", value:"Portobello High School"},{key:"247", value:"Portree High School"},{key:"248", value:"Preston Lodge High School"},{key:"249", value:"Prestwick Academy"},{key:"250", value:"Queen Anne High School"},{key:"251", value:"Queen Margaret Academy"},{key:"252", value:"Queensferry Community High School"},{key:"253", value:"Renfrew High School"},{key:"254", value:"Robert Burns Academy"},{key:"255", value:"Ross High School"},{key:"256", value:"Rosshall Academy"},{key:"257", value:"Rothesay Academy"},{key:"258", value:"Sanquhar Academy"},{key:"259", value:"Selkirk High School"},{key:"260", value:"Sgoil Lionacleit"},{key:"261", value:"Shawlands Academy"},{key:"262", value:"Sir E Scott School"},{key:"263", value:"Smithycroft Secondary School"},{key:"264", value:"Speyside High School"},{key:"265", value:"Springburn Academy"},{key:"266", value:"St Aidan's High School"},{key:"267", value:"St Ambrose High School"},{key:"268", value:"St Andrew's Academy"},{key:"269", value:"St Andrew's and St Bride's High School"},{key:"270", value:"St Andrew's High School"},{key:"271", value:"St Andrew's R C High School"},{key:"272", value:"St Andrew's Secondary School"},{key:"273", value:"St Augustine's High School"},{key:"274", value:"St Benedict's High School"},{key:"275", value:"St Columba's High School"},{key:"276", value:"St Columba's R C High School"},{key:"277", value:"St David's RC High School"},{key:"278", value:"St John Ogilvie High School"},{key:"279", value:"St John's RC Academy"},{key:"280", value:"St John's RC High School"},{key:"281", value:"St Joseph's Academy"},{key:"282", value:"St Joseph's College"},{key:"283", value:"St Kentigern's Academy"},{key:"284", value:"St Luke's High School"},{key:"285", value:"St Machar Academy"},{key:"286", value:"St Margaret Mary's Secondary School"},{key:"287", value:"St Margaret's Academy"},{key:"288", value:"St Margaret's High School"},{key:"289", value:"St Matthew's Academy"},{key:"290", value:"St Maurice's High School"},{key:"291", value:"St Modan's High School"},{key:"292", value:"St Mungo's Academy"},{key:"293", value:"St Mungo's RC High School"},{key:"294", value:"St Ninian's High School"},{key:"295", value:"St Ninian's High School"},{key:"296", value:"St Paul's High School"},{key:"297", value:"St Paul's RC Academy"},{key:"298", value:"St Peter the Apostle High School"},{key:"299", value:"St Roch's Secondary School"},{key:"300", value:"St Stephen's High School"},{key:"301", value:"St Thomas Aquinas Secondary School"},{key:"302", value:"St Thomas Of Aquin's High School"},{key:"303", value:"Stewarton Academy"},{key:"304", value:"Stirling High School"},{key:"305", value:"Stonelaw High School"},{key:"306", value:"Stranraer Academy"},{key:"307", value:"Strathaven Academy"},{key:"308", value:"Stromness Academy"},{key:"309", value:"Tain Royal Academy"},{key:"310", value:"Tarbert Academy"},{key:"311", value:"Taylor High School"},{key:"312", value:"The Community School of Auchterarder"},{key:"313", value:"The Gordon Schools"},{key:"314", value:"The James Young High School"},{key:"315", value:"The Nicolson Institute"},{key:"316", value:"The Royal High School"},{key:"317", value:"Thurso High School"},{key:"318", value:"Tobermory High School"},{key:"319", value:"Trinity Academy"},{key:"320", value:"Trinity High School"},{key:"321", value:"Trinity High School"},{key:"322", value:"Turnbull High School"},{key:"323", value:"Turriff Academy"},{key:"324", value:"Tynecastle High School"},{key:"325", value:"Uddingston Grammar School"},{key:"326", value:"Ullapool High School"},{key:"327", value:"Vale Of Leven Academy"},{key:"328", value:"Viewforth High School"},{key:"329", value:"Waid Academy"},{key:"330", value:"Wallace Hall Academy"},{key:"331", value:"Wallace High School"},{key:"332", value:"Webster's High School"},{key:"333", value:"West Calder High School"},{key:"334", value:"Westhill Academy"},{key:"335", value:"Whitburn Academy"},{key:"336", value:"Whitehill Secondary School"},{key:"337", value:"Wick High School"},{key:"338", value:"Williamwood High School"},{key:"339", value:"Woodfarm High School"},{key:"340", value:"Woodmill High School"}]

  

    const handlePostData = async (data) => {
    try {
      const response = await fetch("http://" +
        Constants.expoConfig.hostUri.split(":").shift() +
        ":1337/api/survey-data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Response Body:', errorBody);
        throw new Error('Network response was not ok');
      }

      // Do something with the successful response, if needed
      const responseData = await response.json();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const categories = [
    "How confident are you with student finance and managing your money?",
    "How confident are you with managing your personal health and wellbeing in first year?",
    "How confident are you with first-year teaching and assessment methods?",
    "How confident are you with dealing with being more independent after leaving school?",
  ];

  const likertOptions = [
    "Fully confident",
    "Quite confident",
    "Not very confident",
    "Not at all confident",
  ];

  // State to store selected values for each Likert scale set
  const [selectedValues, setSelectedValues] = useState(Array(4).fill('NULL'));

  // Radio button options for each Likert scale set
  const radioProps = likertOptions.map((option, index) => ({
    label: option,
    value: index,
  }));




  function process() {

    if (! /\S+@\S+\.\S+/.test(input)){
      alert("Please enter a valid e-mail address.")
      return 0
    }

    if (selected == ""){
      alert("Please select a school.")
      return 0
    }

    for (i=0;i<4;i++){
      if (likertOptions[selectedValues[i]] == undefined){
        alert("Please answer all questions.")
        return 0 
      }
    }

    data = {
    "data": {
      "email": input,
      "school": selected,
      "confidence": [
        {"id":1, "category":"Finance", "confidence":likertOptions[selectedValues[0]]},
        {"id":2, "category":"Wellbeing", "confidence":likertOptions[selectedValues[1]]},
        {"id":3, "category":"Academics", "confidence":likertOptions[selectedValues[2]]},
        {"id":4, "category":"Independence", "confidence":likertOptions[selectedValues[3]]},
        ],
      }
    }

    handlePostData(data)


  }


  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.view}>
        <Text style={style.bigText}>Introductory Survey</Text>

        <View>
          <TextInput
            style={style.input}
            placeholder="Enter your e-mail address"
            onChangeText={(text) => setInput(text)}
            value={input}
          />
        </View>

        <SelectList 

        style={style.temp}

        setSelected={(val) => {setSelected(val);}}
        data={schools}

        boxStyles={style.boxStyle}
        inputStyles={style.dropdownOption} 
        dropdownStyles={style.dropdownOption}
        dropdownTextStyles={style.dropdownOption} 
        dropdownItemStyles={style.dropdownOption}

        placeholder = "Select your school"

        searchPlaceholder = "search"
        searchPlaceholderTextColor = {"white"}

        save="value"
        />

        {categories.map((category, index) => (
          <View key={index} style={style.questionContainer}>
            <Text style={style.smallText}>{category} </Text>

            <RadioForm
              style={style.likertContainer}
              radio_props={radioProps}
              initial={-1} // Set initial to -1 to have no button initially selected
              labelStyle={style.option}
              buttonStyle={{ borderRadius: 1000 }}
              onPress={(value) => {
                const newSelectedValues = [...selectedValues];
                newSelectedValues[index] = value;
                setSelectedValues(newSelectedValues);
              }}
            />
          </View>
        ))}

      <Pressable onPress={() => process()}>
        <Text style={style.submit}>Go to Gatehouse</Text>
      </Pressable>

      </View>
    </ScrollView>
  );
}
