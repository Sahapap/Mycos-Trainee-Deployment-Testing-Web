import { useState } from 'react'
import {
	getAllFood as getAllFoodApi,
	createNewFood as createNewFoodApi,
	deleteFood as deleteFoodApi
} from "./services/food.service"

function App() {
  	const [foodName, setFoodName] = useState<string>("")
	const [allFood, setAllFood] = useState<{id: number, name: string}[]>([])

	const getAllFood = async() => {
		try {
			let data = await getAllFoodApi()
			console.log(data)
			setAllFood(data)
		} catch (error) {
			console.error(error)
			alert("ผิดพลาด")
		}
	}

	const onAddNewFoodClick = async() => {
		try {
			let result = await createNewFoodApi({name: foodName})
			alert(result.data)
			setFoodName("")
			await getAllFood()
		} catch (error) {
			console.error(error)
			alert("ผิดพลาด")
		}
	}

	const onDeleteFoodClick = async(id: string) => {
		try {
			let result = await deleteFoodApi(id)
			alert(result.data)
			await getAllFood()
		} catch (error) {
			console.error(error)
			alert("ผิดพลาด")
		}
	}

  return (
    <>
		<h1>อาหาร</h1>

		<span>ชื่ออาหาร: </span> <input type='text' onChange={(e) => setFoodName(e.target.value)} value={foodName}/> &nbsp;
		<button onClick={() => onAddNewFoodClick()}>เพิ่ม</button> &nbsp;
		<button onClick={() => getAllFood()}>แสดงทั้งหมด</button>
		<br/>
		<br/>
		<table style={{border: '1px solid black', width: 200}}>
			<thead>
				<tr style={{border: '1px solid black'}}>
					<td>ชื่อ</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{allFood.map(m => {
					return (
						<tr key={m.id} style={{border: '1px solid black'}}>
							<td style={{border: '1px solid black'}}>{m.name}</td>
							<td><button onClick={() => onDeleteFoodClick(m.id.toString())}>ลบ</button></td>
						</tr>
					)
				})}
			</tbody>
		</table>
		
    </>
  )
}

export default App
