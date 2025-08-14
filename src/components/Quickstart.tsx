import { useState } from 'react';
import type { FC } from 'react';
import { Copy } from 'lucide-react';
import FadeIn from './FadeIn';

const Quickstart: FC = () => {
    const [activeTab, setActiveTab] = useState<'producer' | 'consumer'>('producer');
    const [copySuccess, setCopySuccess] = useState('');

    const producerCode = `package main

import (
	"fmt"
	"time"
	"github.com/user/gofka"
)

func main() {
	p, err := gofka.NewProducer(&gofka.ConfigMap{"bootstrap.servers": "localhost:9092"})
	if err != nil {
		panic(err)
	}
	defer p.Close()

	topic := "my-topic"
	for _, word := range []string{"Welcome", "to", "Gofka"} {
		p.Produce(&gofka.Message{
			TopicPartition: gofka.TopicPartition{Topic: &topic, Partition: gofka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}

	p.Flush(15 * 1000)
}`;

    const consumerCode = `package main

import (
	"fmt"
	"github.com/user/gofka"
)

func main() {
	c, err := gofka.NewConsumer(&gofka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "my-group",
		"auto.offset.reset": "earliest",
	})
	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{"my-topic"}, nil)
	defer c.Close()

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\\n", msg.TopicPartition, string(msg.Value))
		} else {
			fmt.Printf("Consumer error: %v (%v)\\n", err, msg)
		}
	}
}`;

    const handleCopy = () => {
        const codeToCopy = activeTab === 'producer' ? producerCode : consumerCode;
        const textArea = document.createElement("textarea");
        textArea.value = codeToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed');
        }
        document.body.removeChild(textArea);
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <section id="quickstart" className="py-20 md:py-32 bg-gray-50 text-black">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Get Started in Minutes</h2>
                        <p className="font-sans text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                            Publish and consume your first messages with just a few lines of Go.
                        </p>
                    </div>
                </FadeIn>
                <FadeIn delay="200ms">
                    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden">
                        <div className="flex bg-gray-800 text-white font-mono text-sm border-b border-gray-700">
                            <button onClick={() => setActiveTab('producer')} className={`px-6 py-3 ${activeTab === 'producer' ? 'bg-black' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}>producer.go</button>
                            <button onClick={() => setActiveTab('consumer')} className={`px-6 py-3 ${activeTab === 'consumer' ? 'bg-black' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}>consumer.go</button>
                            <div className="flex-grow"></div>
                            <div className="relative">
                                <button onClick={handleCopy} className="px-4 py-3 bg-gray-700 hover:bg-gray-600 transition-colors flex items-center space-x-2">
                                    <Copy size={16}/>
                                    <span>{copySuccess || 'Copy'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <pre className="text-white text-sm leading-relaxed overflow-x-auto"><code className="language-go">{activeTab === 'producer' ? producerCode : consumerCode}</code></pre>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Quickstart;
