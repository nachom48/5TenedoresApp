import React,{useState} from 'react'
import { View, Text } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import { styles } from './AccountOptions.styles'
import { Modal } from '../../../Shared/Modal/Modal';
import ChangeDisplayNameForm from '../../ChangeDisplayNameForm/ChangeDisplayNameForm';
import ChangeEmailForm from '../../ChangeEmailForm/ChangeEmailForm';
import ChangePasswordForm from '../../ChangePasswordForm/ChangePasswordForm';

interface IAccountOptionsProps{
    onReload:() => void;
}

export default function AccountOptions({onReload}:IAccountOptionsProps) {
    const [showModal,setShowModal]=useState<boolean>(false)
    const [renderComponent, setRenderComponent] = useState<React.ReactNode | null>(null);

    const onCloseOpenModal =()=> setShowModal((prevState)=>!prevState);
 
    const selectedComponent = (key:string) =>{
        if (key === 'displayName'){
            setRenderComponent(<ChangeDisplayNameForm 
                onReload={onReload} 
                onClose={onCloseOpenModal}/>);
        }
        if (key==='email'){
            setRenderComponent(<ChangeEmailForm onReload={onReload} onClose={onCloseOpenModal}/>);
        }
        if (key==='password'){
            setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal}/>);
        }
        
        onCloseOpenModal();
    }
    const menuOptions = getMenuOptions(selectedComponent);

    return (
        <View style={styles.accountInfoMain}>
            {menuOptions.map(((el, index) => {
                return (
                    <ListItem
                        key={index}
                        onPress={el.onPress}
                        containerStyle={styles.listStyles}
                    >
                        <Icon
                            type={el.iconType}
                            name={el.iconNameLeft}
                            color={el.iconColorLeft}
                        />
                        <Text >
                           {el.title}
                        </Text>
                        <Icon
                            type={el.iconType}
                            name={el.iconNameRight}
                            color={el.iconColorRight}
                            
                            style={{alignSelf: "flex-end" }}
                        />
                    </ListItem>


                )
            }))}
            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}


const getMenuOptions = (selectedComponent:any) => {
    return [
        {
            title: 'Change name and last name',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Change email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('email')

        },
        {
            title: 'Change password',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('password')

        }
    ]
}