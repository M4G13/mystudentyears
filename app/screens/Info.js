export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: null, 
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:1337/api/information-pages/1'); // Change all localhost's  with ip 
            const data = await response.json();

            if (response.status === 200 && data.data && data.data.attributes) {
                this.setState({ information: data.data.attributes });
            } else {
                console.error('Error fetching data:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    _wrongButton() {
        Alert.alert('Wrong ❌');
    }
    _correctButton() {
        Alert.alert('Correct ✅');
    }

    render() {
        const { information } = this.state;

        return (
            <View style={styles.container}>
                {information && (
                    <View style={styles.questionContainer}>
                        <Image source={require('./assets/mirror.png')} style={{ width: 100, height: 200, objectFit: 'contain' }} />
                        <Text style= {styles.questionText}>Mirror, mirror on the wall-who is the fairest of them all?</Text>
                        <Text style={styles.questionText}>{information.Title}</Text>
                        <Text style={styles.questionText}>{information.content}</Text>
                        <Image source={{ uri: 'http://localhost:1337/uploads/Wallet_689b92f573.jpg' }} style={{ width: 100, height: 100}} />  
                        

                    </View>
                )}
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#dd8844' }]}>
                        <Text style={styles.answerText}>Snow White</Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#44dd88' }]}>
                        <Text style={styles.answerText}>Evil Queen</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._correctButton} style={[styles.answerButton, { backgroundColor: '#dd4488' }]}>
                        <Text style={styles.answerText}>Dopey</Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#8844dd' }]}>
                        <Text style={styles.answerText}>Huntsman</Text>
                    </Pressable>
                </View>
            </View>
        );
}
