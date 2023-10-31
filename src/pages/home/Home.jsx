import { createSignal, onMount } from "solid-js";
import { createClient } from '@supabase/supabase-js';

const Home = () => {
  const supabase = createClient('https://yiglmbcswqzvxmhstwiq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZ2xtYmNzd3F6dnhtaHN0d2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MjUzNjEsImV4cCI6MjAxNDMwMTM2MX0.39hMv8Bgxlv3GmUX04JimOM632Ypbee1Zr8r-6cophE')
  const [products, setProducts] = createSignal([])

  const initData = async() => {
    const datas = await supabase.from('products').select()
    setProducts(datas.data)
  }

  onMount(() => {
    initData();
  })

  return (
    <>
      <h3>Hell Solidjs</h3>
      <For each={products()}>{(product) => 
          <li>{product.name}</li>
      }</For>
    </>
  )
}

export default Home